import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react'

const CadastroScreen = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [Senha, setSenha] = useState();
  const [Secure, setSecure] = useState(true);
  const [Senha2, setSenha2] = useState();
  const [Secure2, setSecure2] = useState(true);
  return (
    <ScrollView  contentContainerStyle={styles.Container} style={styles.baseView}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
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
        <View style={styles.senha}>
            <TextInput
              style={styles.input}
              placeholder='Confirmar Senha' 
              onChangeText={setSenha2}       
              placeholderTextColor="#ccc"
              secureTextEntry={Secure2}     
              value={Senha2}                 
            />
            <TouchableOpacity onPress={() => { setSecure2(!Secure2) }} style={styles.seguro}>
              <Image source={require("../../assets/olho.png")} style={styles.olho} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cadastro}>

          <TouchableOpacity 
              style={styles.botaoLogin} 
              onPress={() => { navigation.navigate('Inicio'); }}
            >
              <Text style={styles.textLogin}>Criar Conta</Text>
            </TouchableOpacity>
            
          <Text style={styles.textoPergunta}>Já possui uma Conta?</Text>
        <TouchableOpacity 
            style={styles.botaoCriar} 
            onPress={() => { navigation.navigate('Login'); }}
          >
            <Text  style={styles.textCriar} >Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icone}>
          <Image source={require('../../assets/IconBatidas.png')} style={styles.Logo2} />
        </View>
    </ScrollView>
  )
}

export default CadastroScreen

const styles = StyleSheet.create({
    BaseView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  Container:{
    backgroundColor: "#ffffff",
    margin:0,
    minHeight: '100%',
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
    marginTop: 0,
    marginLeft:15,
    left:15,
    top:20,
    backgroundColor:"#d4d4d4b2",
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
    borderColor:"#61514D",
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
    backgroundColor: "#E06641",
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
    borderColor:"#41E0B6",
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,

  },
  textCriar:{
    fontSize: 20,
    color:"#41E0B6"
  },
  textoPergunta:{
    color:"#41E0B6",
    alignSelf:"center",
    paddingBottom:5,
    padding: 20,
  },
  Logo2: { width: 100, height: 50, backgroundColor:"tranparent"},
})