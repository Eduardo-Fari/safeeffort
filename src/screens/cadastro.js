import { StyleSheet, Text, View, Button, Image} from 'react-native'
import React from 'react'

const CadastroScreen = ({navigation}) => {
  return (
    <View>
      <View>
         <Image source={require('../../assets/IconLogin.png')} style={styles.Logo} />
      </View>
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Button title='Criar Conta' onPress={()=>{
          navigation.goBack();
        }}/>
        </View>
        <View>
          <Text>Já possui uma conta?</Text>
          <Button title='Login' onPress={()=>{
                navigation.navigate('Home');
          }}/>
        </View>
    </View>
  )
}

export default CadastroScreen

const styles = StyleSheet.create({
  ContainerSplash:{
    flex: 1,                      
    justifyContent: 'center',     
    alignItems: 'center',         
    backgroundColor: '#6fca4b',   
    padding: 20, 
    },
    TextSplash:{
        color: "#a85454",
        textAlign: "center",
        alignContent:"center",
    },
    Logo: {
    width: '100%',          
    height: '40%',        
    resizeMode: 'contain' 
  },
})