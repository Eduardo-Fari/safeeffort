import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InicioScreen() {
  // Estados para Fotos e Câmera
  const [imageUri, setImageUri] = useState(null);

  // Estados para GPS e Precisão
  const [location, setLocation] = useState(null);
  const [accuracyColor, setAccuracyColor] = useState('#CCCCCC'); // Cinza padrão

  // Estados para Acelerômetro
  const [dadosAcel, setDadosAcel] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // 1. Iniciar GPS (RNF01: Tratamento de Erros)
    obterLocalizacao();

    // 2. Iniciar Acelerômetro
    let subscription = null;
    if (Platform.OS !== 'web') {
      try {
        subscription = Accelerometer.addListener((data) => setDadosAcel(data));
        Accelerometer.setUpdateInterval(200);
      } catch (error) {
        console.log('Acelerômetro indisponível no dispositivo.');
      }
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // --- NÍVEL JÚNIOR: Captura de Foto com Tratamento Avançado de Permissão ---
  const tirarFoto = async () => {
    try {
      const { status, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        if (!canAskAgain) {
          Alert.alert(
            'Permissão Necessária',
            'O acesso à câmera foi desativado. Abra as configurações do aparelho para permitir o uso da câmera.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
            ]
          );
        } else {
          Alert.alert('Aviso', 'Permissão de uso da câmera negada.');
        }
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a câmera do dispositivo.');
    }
  };

  // --- RF02: Captura e Feedback Visual do GPS ---
  const obterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(loc);

      // Regra de cores de precisão
      const acc = loc.coords.accuracy;
      if (acc < 10) {
        setAccuracyColor('#2ECC71'); // Verde: Alta precisão (< 10m)
      } else if (acc <= 30) {
        setAccuracyColor('#F1C40F'); // Amarelo: Média precisão (10m - 30m)
      } else {
        setAccuracyColor('#E74C3C'); // Vermelho: Baixa precisão (> 30m)
      }
    } catch (error) {
      console.log('GPS desligado ou indisponível.');
    }
  };

  // --- NÍVEL PLENO: Trava de Segurança por Acelerômetro (> 2.0g) & RF01 (Persistência) ---
  const finalizarAuditoria = async () => {
    const { x, y, z } = dadosAcel;

    // Cálculo da aceleração vetorial agregada (em g)
    const aceleracaoTotal = Math.sqrt(x * x + y * y + z * z);

    // Trava de segurança do Nível Pleno
    if (aceleracaoTotal > 2.0) {
      Alert.alert(
        'Bloqueio de Segurança',
        'Instabilidade Física Detectada! Por favor, mantenha o celular estável ao fechar a auditoria.'
      );
      return;
    }

    // Salvar registro localmente (RF01 - AsyncStorage)
    try {
      const novoRegistro = {
        id: Date.now().toString(),
        data: new Date().toLocaleString('pt-BR'),
        foto: imageUri,
        localizacao: location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Sem GPS',
      };

      const registrosAtuais = await AsyncStorage.getItem('@visitas_tecnicas');
      const lista = registrosAtuais ? JSON.parse(registrosAtuais) : [];
      lista.push(novoRegistro);

      await AsyncStorage.setItem('@visitas_tecnicas', JSON.stringify(lista));

      Alert.alert('Sucesso', 'Auditoria e Visita Técnica salvas localmente!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a visita no histórico local.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de Visita Técnica</Text>

      {/* RF02: Indicador Visual de Precisão do GPS */}
      <View style={styles.gpsCard}>
        <View style={styles.gpsRow}>
          <Text style={styles.label}>Sinal do GPS:</Text>
          <View style={[styles.statusDot, { backgroundColor: accuracyColor }]} />
        </View>
        <Text style={styles.subtext}>
          {location
            ? `Precisão: ${location.coords.accuracy.toFixed(1)}m`
            : 'Obtendo localização...'}
        </Text>
      </View>

      {/* Nível Júnior: Foto de Câmera */}
      <TouchableOpacity style={styles.botao} onPress={tirarFoto}>
        <Text style={styles.textoBotao}>Tirar Foto da Câmera</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      {/* Nível Pleno: Botão para Fechar Auditoria */}
      <TouchableOpacity style={[styles.botao, styles.botaoFinalizar]} onPress={finalizarAuditoria}>
        <Text style={styles.textoBotao}>Finalizar Auditoria</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333333',
  },
  gpsCard: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 20,
  },
  gpsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  subtext: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  botao: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoFinalizar: {
    backgroundColor: '#2ECC71',
    marginTop: 20,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});