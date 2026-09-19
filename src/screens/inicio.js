import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InicioScreen() {
  const [imagem, setImagem] = useState(null);
  const [precisaoGps, setPrecisaoGps] = useState(null);
  const [corGps, setCorGps] = useState('#CCCCCC');
  const [dadosAcel, setDadosAcel] = useState({ x: 0, y: 0, z: 0 });
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    let inscricaoAcel = null;

    // RNF01: Proteção para não quebrar na Web ou em aparelhos sem o sensor
    if (Platform.OS !== 'web') {
      try {
        inscricaoAcel = Accelerometer.addListener((dados) => setDadosAcel(dados));
        Accelerometer.setUpdateInterval(300);
      } catch (error) {
        console.log('Acelerômetro indisponível neste dispositivo.');
      }
    }

    carregarHistoricoLocal();
    obterLocalizacao();

    return () => {
      if (inscricaoAcel) inscricaoAcel.remove();
    };
  }, []);

  // RF02 - Monitoramento da Precisão do GPS com proteção de erro
  const obterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const precisao = loc.coords.accuracy;
      setPrecisaoGps(precisao.toFixed(1));

      if (precisao < 10) setCorGps('#2EC4B6'); // Verde
      else if (precisao <= 30) setCorGps('#FFB703'); // Amarelo
      else setCorGps('#E07A5F'); // Vermelho
    } catch (error) {
      console.log('Erro ao obter GPS ou recurso desativado:', error);
    }
  };

  // Nível Júnior - Captura de Imagem com tratamento de permissão negada
  const capturarImagem = async () => {
    try {
      const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        if (!canAskAgain) {
          Alert.alert(
            'Permissão Necessária',
            'A permissão foi negada permanentemente. Abra as configurações do aparelho para permitir o acesso.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
            ]
          );
        } else {
          Alert.alert('Acesso Negado', 'É necessário permitir o acesso à galeria.');
        }
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a galeria no momento.');
    }
  };

  // Nível Pleno - Validação por Acelerômetro e RF01 - Persistência
  const finalizarAuditoria = async () => {
    // Cálculo da aceleração vetorial: sqrt(x^2 + y^2 + z^2)
    const acelTotal = Math.sqrt(
      Math.pow(dadosAcel.x, 2) + Math.pow(dadosAcel.y, 2) + Math.pow(dadosAcel.z, 2)
    );

    if (acelTotal > 2.0) {
      Alert.alert('Instabilidade Física Detectada', 'O envio foi bloqueado devido a uma movimentação brusca do aparelho.');
      return;
    }

    try {
      const novoRegistro = {
        id: Date.now().toString(),
        data: new Date().toLocaleTimeString(),
        precisao: precisaoGps || 'N/A',
      };

      const historicoAtualizado = [novoRegistro, ...historico];
      setHistorico(historicoAtualizado);
      await AsyncStorage.setItem('@historico_visitas', JSON.stringify(historicoAtualizado));

      Alert.alert('Sucesso', 'Auditoria salva com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados localmente.');
    }
  };

  const carregarHistoricoLocal = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@historico_visitas');
      if (dadosSalvos) setHistorico(JSON.parse(dadosSalvos));
    } catch (error) {
      console.log('Erro ao carregar histórico:', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gpsCard}>
          <Text style={styles.gpsText}>Sinal GPS: {precisaoGps ? `${precisaoGps}m` : 'Buscando...'}</Text>
          <View style={[styles.statusDot, { backgroundColor: corGps }]} />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={capturarImagem}>
          <Text style={styles.actionButtonText}>Selecionar Imagem de Auditoria</Text>
        </TouchableOpacity>

        {imagem && <Image source={{ uri: imagem }} style={styles.previewImage} />}

        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={finalizarAuditoria}>
          <Text style={styles.actionButtonText}>Finalizar Auditoria (Valida Acel.)</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Histórico Salvo Localmente</Text>
        {historico.map((item) => (
          <View key={item.id} style={styles.cardItem}>
            <Text style={styles.diaText}>Visita registrada às {item.data}</Text>
            <Text style={styles.subtext}>Precisão GPS: {item.precisao}m</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#555555', marginVertical: 10 },
  gpsCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#F0F0F0', borderRadius: 8, marginBottom: 10 },
  gpsText: { fontSize: 14, fontWeight: '500', color: '#333' },
  statusDot: { width: 14, height: 14, borderRadius: 7 },
  actionButton: { backgroundColor: '#2EC4B6', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  saveButton: { backgroundColor: '#E07A5F' },
  actionButtonText: { color: '#FFF', fontWeight: 'bold' },
  previewImage: { width: '100%', height: 150, borderRadius: 8, marginVertical: 8 },
  cardItem: { borderWidth: 1.5, borderColor: '#2EC4B6', borderRadius: 12, padding: 12, marginBottom: 10 },
  diaText: { fontSize: 16, fontWeight: 'bold', color: '#333333' },
  subtext: { fontSize: 12, color: '#777777' },
});