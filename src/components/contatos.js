import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ListaContatos(){
    //armazena o array de contatos
    const [contatos, setContatos] = useState([]);

    //funcao assincrona de acesso aos contatos
    const carregarContatos = async () =>{
        //solicita a permissão
        const {status} = await Contacts.requestPermissionsAsync();

        if (status === 'granted'){
            const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

            if (data.length > 0){
                setContatos(data);
            }
        } else{
            alert('permissao de acesso aos contatos negada.');
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
            renderItem={({ item }) =>(
                <View style={StyleSheet.itemContato}>
                    <Text style={Styles.nomeContato}>{item.name}</Text>
                    {item.PhoneNumbers && item.phoneNumbers.length > 0 && (
                        <Text style={styles.telefoneContato}>{item.PhoneNumbers[0].number}</Text>
                    )}
                </View>
            )}
            style={styles.lista}
            />
        </View>      
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    botao: {
        backgroundColor:'#34C759',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20
    },
    textBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    lista: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    },
    nomeContato: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    telefoneContato: {
        fontSize: 14,
        color: '#666666'
    }
});