import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContatosScreen() {
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [temMais, setTemMais] = useState(true);

  const PAGE_SIZE = 20;

  useEffect(() => {
    carregarContatos(0, busca, true);
  }, [busca]);

  const carregarContatos = async (pageOffset, termoBusca, reiniciar = false) => {
    if (carregando) return;
    setCarregando(true);

    try {
      if (Platform.OS === 'web') {
        setCarregando(false);
        return;
      }

      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          name: termoBusca ? termoBusca : undefined,
          pageSize: PAGE_SIZE,
          pageOffset: pageOffset * PAGE_SIZE,
        });

        if (data.length < PAGE_SIZE) setTemMais(false);
        else setTemMais(true);

        if (reiniciar) {
          setContatos(data);
          setPagina(1);
        } else {
          setContatos((prev) => [...prev, ...data]);
          setPagina(pageOffset + 1);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar contatos:', error);
    }
    setCarregando(false);
  };

  const carregarMaisContatos = () => {
    if (!carregando && temMais) {
      carregarContatos(pagina, busca, false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ padding: 16, flex: 1 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar contatos na memória nativa..."
          value={busca}
          onChangeText={setBusca}
        />
        <FlatList
          data={contatos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContato}>
              <Text style={styles.nomeText}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text style={styles.subText}>{item.phoneNumbers[0].number}</Text>
              )}
            </View>
          )}
          onEndReached={carregarMaisContatos}
          onEndReachedThreshold={0.5}
          ListFooterComponent={carregando ? <ActivityIndicator size="small" color="#2EC4B6" /> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  searchInput: { height: 45, borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  cardContato: { borderWidth: 1.5, borderColor: '#2EC4B6', borderRadius: 12, padding: 12, marginBottom: 10 },
  nomeText: { fontSize: 16, fontWeight: 'bold', color: '#333333' },
  subText: { fontSize: 12, color: '#777777' },
});