import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ListaContatos() {
  const [contatos, setContatos] = useState([]);

  const carregarContatos = async () => {
    // 1. Verifica/solicita permissão
    const { status, canAskAgain } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data && data.length > 0) {
        setContatos(data);
      }
    } else {
      // 2. Se a permissão foi negada permanentemente
      if (!canAskAgain) {
        Alert.alert(
          'Permissão Necessária',
          'A permissão para aceder aos contactos foi desativada. Deseja abrir as configurações do dispositivo para permitir o acesso?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { 
              text: 'Abrir Configurações', 
              onPress: () => Linking.openSettings() // Leva o utilizador para ativar a permissão
            },
          ]
        );
      } else {
        Alert.alert('Aviso', 'Permissão de acesso aos contactos negada.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={carregarContatos}>
        <Text style={styles.textBotao}>Listar Contatos</Text>
      </TouchableOpacity>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContato}>
            <Text style={styles.nomeContato}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text style={styles.telefoneContato}>{item.phoneNumbers[0].number}</Text>
            )}
          </View>
        )}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  botao: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  textBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  lista: {
    width: '100%',
    paddingHorizontal: 15,
  },
  itemContato: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  nomeContato: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  telefoneContato: {
    fontSize: 14,
    color: '#666666',
  },
});