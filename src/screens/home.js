import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  //const navigation = useNavigation();
  return (
    <View style={styles.ContainerCadastro}>
      <Text style={styles.TextCadastro}>homeScreen</Text>

      <Button  color={"purple"} title='Login' onPress={()=>{
        navigation.navigate('Login');

      }}/>
      <Button color={"red"} title='Cadastrar-se' onPress={()=>{
        navigation.navigate('Cadastro');
      }}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    ContainerCadastro:{
    flex: 1,                      // Ocupa a tela inteira
    justifyContent: 'center',     // Centraliza verticalmente
    alignItems: 'center',         // Centraliza horizontalmente
    backgroundColor: '#bb9d9d',   // Cor de fundo leve
    padding: 20, 
    },
    TextCadastro:{
        color: "#a85454",
        textAlign: "center",
        alignContent:"center",
    }
    
})