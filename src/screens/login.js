import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react'

const LoginScreen = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [Senha, setSenha] = useState();
  const [Secure, setSecure] = useState(true);
  return (
    <View styles={style.Container}>
      <View styles={style.borda}>
        <View styles={style.imagem}>
          <Image source={require('../../assets/IconLogin.png')} style={styles.Logo} />
        </View>
        <View>
        <Text styles={style.textHeader1}>faça login</Text>
        <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={setEmail}
              placeholderTextColor="#ccc"
              value={Email}
            />
            <View>
            <TextInput
              style={styles.input}
              placeholder='Senha'
              onChangeText={setSenha}
              placeholderTextColor="#ccc"
              type="password"
              secureTextEntry={secure}
              value={Senha}
            />
        <TouchableOpacity onPress={() => {setSecure(!secure)}}></TouchableOpacity>
        </View>
        </View>
        <View>
        <Button title='Login' onPress={()=>{
                navigation.goBack();
        }}/>
        
        <Text>Não possui Conta?</Text>
        <Button title='Criar Conta' onPress={()=>{
              navigation.navigate('Home');
        }}/>
        </View>
        <View style={styles.icone}>
          <Image source={require('../../assets/IconLogin.png')} style={styles.Logo2} />
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Logo: { width: 100, height: 100 } 
})