import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react'

const LoginScreen = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [senha, setSenha] = useState(true);
  return (
    <View style={styles.Container1}>
      <View style={styles.borda}>
        <View style={styles.logo}>
          <Image source={require('../../assets/IconLogin.png')} style={styles.Logo} />
        </View>
        <View style={styles.verificao}>
          <View style={styles.Email}>
            <Text styles={style.textLogin}>faça login</Text>
            <TextInput
              style={styles.input1}
              placeholder='Email'
              onChangeText={setEmail}
              placeholderTextColor="#ccc"
              value={Email}
            />
          </View>
          <View style={styles.Senha}>
            <TextInput
              style={styles.input2}
              placeholder='Senha'
              onChangeText={setSenha}
              placeholderTextColor="#ccc"
              type="password"
              secureTextEntry={secure}
              value={Senha}
            />
            <TouchableOpacity onPress={() => {setSecure(!secure)}}></TouchableOpacity>
          </View>
        <View>
        <View style={styles.login}>
          <Button title='Login' onPress={()=>{navigation.goBack();}}/>
        </View>
        <View styles={styles.criar}>
          <Text>Não possui Conta?</Text>
          <Button title='Criar Conta' onPress={()=>{navigation.navigate('Cadastro');}}/>
        </View>
      </View>
    </View> 
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Logo: {
    margin: 0,
    width: 450,          
    height: 275,        
    resizeMode: "cover",
    opacity: "80%"
}});
