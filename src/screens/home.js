import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  //const navigation = useNavigation();
  return (
    <View style={styles.ContainerCadastro}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.Logo}
      />
      <Text style={styles.TextCadastro}>Safe Effort</Text>

      <Button  color={"purple"} title='Login' onPress={()=>{
        navigation.navigate('Login');

      }}/>
      <Button color={"red"} title='Criar conta' onPress={()=>{
        navigation.navigate('Cadastro');
      }}/>
      <View style={{marginTop: 20}}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.Logo2}
      />
      <Image
        source={require('../assets/logo2.png')}
        style={styles.Logo2}
      />
      </View>
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