import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react'

const LoginScreen = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [Senha, setSenha] = useState();
  const [Secure, setSecure] = useState(true);

  const mail = "admin@gmail.com";
  const sen = 1234;
  const Validar = () => {
    const emailDigitado = Email ? Email.trim() : '';
    const senhaDigitada = Senha ? Senha.trim() : '';

    if (!emailDigitado || !senhaDigitada) {
      if (typeof window !== 'undefined' && window.alert) {
        alert("Por favor, preencha todos os campos.");
      } else {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
      }
      return;
    }

    if (emailDigitado.toLowerCase() === mail.toLowerCase() && senhaDigitada === sen.toString()) {
      if (typeof window !== 'undefined' && window.alert) {
        alert("Login realizado com sucesso!");
        navigation.navigate('Inicio');
      } else {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.navigate('Inicio');
      }
    } else {
      if (typeof window !== 'undefined' && window.alert) {
        alert("E-mail ou senha incorretos. Tente novamente.");
      } else {
        Alert.alert("Erro de Autenticação", "E-mail ou senha incorretos. Tente novamente.");
      }
    }
  };//essa função foi feita com ajuda da ia, porque nao aparece o alert do react native na web
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.voltar} onPress={()=> {
        navigation.goBack();
      }}>
        <Text style={styles.voltarSeta}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.Borda}>
        <View style={styles.imagem}>
          <Image source={require('../../assets/IconLogin.png')} style={styles.Logo} />
        </View>
        <View>
        <Text style={styles.textHeader1}>faça login</Text>
        <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={setEmail}
              placeholderTextColor="#ccc"
              value={Email}
            />
            <View style={styles.senha}>
            <TextInput
              style={styles.input}
              placeholder='Senha'
              onChangeText={setSenha}
              placeholderTextColor="#ccc"
              type="password"
              secureTextEntry={Secure}
              value={Senha}
            />
        <TouchableOpacity onPress={() => {setSecure(!Secure)}} style={styles.seguro}>
          <Image source={require("../../assets/olho.png")} style={styles.olho}></Image>
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.cadastro}>

          <TouchableOpacity 
              style={styles.botaoLogin} 
              onPress={Validar}
            >
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
            
          <Text style={styles.textoPergunta}>Não possui Conta?</Text>
        <TouchableOpacity 
            style={styles.botaoCriar} 
            onPress={() => { navigation.navigate('Cadastro'); }}
          >
            <Text style={styles.textCriar}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icone}>
          <Image source={require('../../assets/IconBatidas.png')} style={styles.Logo2} />
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#ffffff",
    margin:0,
    flex:1,
    flexDirection: "column",
    justifyContent:"space-between",
    alignItems: "center",
    padding:10,
    paddingTop:50
  },
  voltar:{
    position:"absolute",
    alignContent:"center",
    justifyContent:"center",
    margintop: 15,
    marginLeft:15,
    left:15,
    top:20,
    backgroundColor:"#d4d4d4",
    borderRadius:15,
    width:15
  },
  voltarSeta:{
    fontWeight:"bold",
    alignSelf:"center",
    justifyContent:"center"
  },
  Borda:{
    flexDirection: "column",
    borderWidth:1,
    borderColor:"#41E0B6",
    justifyContent:"space-between",
    padding: 20,        
    width: '85%', 
    borderRadius: 5 
  }, 
  imagem:{
    alignContent:"center",
    alignSelf: "center",
    paddingBottom: 15
  },
  Logo: { 
    width: 100,
   height: 100,
    borderRadius: 100
   },
  textHeader1:{
    color: "#0f2c23",
    fontSize: 10,
    fontFamily: "italic"
  },
  input: {                          
    borderColor: '#7a7a7a',
    fontSize: 15,
    fontFamily: "italic",
    color:"#ffffff",
    backgroundColor:"#305047",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%'
  },
  senha:{
    flexDirection: "row",
    justifyContent:"space-between",
    alignContent:"center",

  },
  seguro:{
    width: 15,
    height: 15,
    right: 10,
    alignSelf:"center",
    justifyContent:"center",
    position:"absolute",
  },
  olho:{
    alignSelf:"center",
    justifyContent:"center",
    width:25,
    height:25,
    resizeMode: "contain",
    position:"absolute"
  },
  cadastro:{
    paddingTop: 30,
  },
  botaoLogin:{
    backgroundColor: "#41E0B6",
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    
  },
  textLogin:{
    fontSize: 20,
    color:"#ffffff"
  },
  botaoCriar:{
    backgroundColor: "#ffffff",
    borderWidth:1,
    borderColor:"#E06641",
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  textCriar:{
    fontSize: 20,
    color:"#E06641"
  },
  textoPergunta:{
    color:"#E06641",
    alignSelf:"center",
    paddingBottom:5,
    padding: 20,
  },
  Logo2: { width: 100, height: 50 },
})