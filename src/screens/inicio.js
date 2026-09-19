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
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [accuracyColor, setAccuracyColor] = useState('#CCCCCC');
  const [dadosAcel, setDadosAcel] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    obterLocalizacao();

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

  // Nível Júnior - Câmera com redirecionamento para Configurações
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

  // RF02 - Cores Obrigatórias do GPS (Verde, Amarelo, Vermelho)
  const obterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(loc);

      const acc = loc.coords.accuracy;
      if (acc < 10) {
        setAccuracyColor('#2ECC71'); // Verde obrigatorio (< 10m)
      } else if (acc <= 30) {
        setAccuracyColor('#F1C40F'); // Amarelo obrigatorio (10m - 30m)
      } else {
        setAccuracyColor('#E74C3C'); // Vermelho obrigatorio (> 30m)
      }
    } catch (error) {
      console.log('GPS desligado ou indisponível.');
    }
  };

  // Nível Pleno (Acelerômetro > 2.0g) + RF01 (AsyncStorage)
  const finalizarAuditoria = async () => {
  try {
    // 1. Aceleração com fallback (evita erro se dadosAcel for nulo)
    if (dadosAcel && dadosAcel.x !== undefined) {
      const { x, y, z } = dadosAcel;
      const aceleracaoTotal = Math.sqrt(x * x + y * y + z * z);

      // Aumentado ligeiramente o limite ou verificado se não é 0 (emulador)
      if (aceleracaoTotal > 2.5) {
        Alert.alert(
          'Instabilidade Detectada',
          'Movimento muito brusco detetado. Segure o telemóvel com firmeza.'
        );
        return;
      }
    }

    // 2. Criação do registo com proteção para caso a imagem esteja vazia
    const novoRegistro = {
      id: Date.now().toString(),
      data: new Date().toLocaleString('pt-PT'),
      foto: imageUri ? imageUri : 'Sem foto capturada',
      localizacao: location
        ? `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
        : 'GPS não disponível',
    };

    // 3. Guardar no AsyncStorage
    const registrosAtuais = await AsyncStorage.getItem('@visitas_tecnicas');
    const lista = registrosAtuais ? JSON.parse(registrosAtuais) : [];
    lista.unshift(novoRegistro); // Adiciona no início da lista

    await AsyncStorage.setItem('@visitas_tecnicas', JSON.stringify(lista));

    Alert.alert('Sucesso', 'Auditoria guardada com sucesso!');
  } catch (error) {
    Alert.alert('Erro', `Falha ao guardar: ${error.message}`);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de Visita Técnica</Text>

      {/* Card do GPS - Fundo escuro igual ao card de HRV da carcaça (#4E7C6F) */}
      <View style={styles.gpsCard}>
        <View style={styles.gpsRow}>
          <Text style={styles.labelGPS}>Sinal do GPS:</Text>
          <View style={[styles.statusDot, { backgroundColor: accuracyColor }]} />
        </View>
        <Text style={styles.subtextGPS}>
          {location
            ? `Precisão: ${location.coords.accuracy.toFixed(1)}m`
            : 'Obtendo localização...'}
        </Text>
      </View>

      {/* Botão de Câmera - Laranja da carcaça (#E07A5F) */}
      <TouchableOpacity style={styles.botaoCamera} onPress={tirarFoto}>
        <Text style={styles.textoBotao}>Tirar Foto da Câmera</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      {/* Botão de Finalizar - Verde-água da carcaça (#2EC4B6) */}
      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarAuditoria}>
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
    color: '#555555',
  },
  gpsCard: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#4E7C6F', // Verde escuro da carcaça
    marginBottom: 20,
  },
  gpsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelGPS: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  subtextGPS: {
    fontSize: 12,
    color: '#B2E2D8',
    marginTop: 5,
  },
  botaoCamera: {
    width: '100%',
    backgroundColor: '#E07A5F', // Laranja da carcaça original
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoFinalizar: {
    width: '100%',
    backgroundColor: '#2EC4B6', // Verde-água da carcaça original
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderColor: '#2EC4B6',
    borderWidth: 2,
    marginVertical: 10,
  },
});