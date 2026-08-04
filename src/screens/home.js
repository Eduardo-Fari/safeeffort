import { StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  //const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.divHeader}>
      <Image
        source={require('../../assets/IconLogin.png')}
        style={styles.Logo}
      />
      <Text style={styles.TextHeader}>Safe Effort</Text>
      </View>
      <TouchableOpacity style={styles.meuBotao1} onPress={() => navigation.replace('Home')}>
        <Text style={styles.textoBotao1}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.meuBotao2} onPress={() => navigation.replace('Home')}>
        <Text style={styles.textoBotao2}>Criar conta</Text>
      </TouchableOpacity>
      <View style={styles.divHome}>
      <Image
        source={require('../../assets/IconFacebook.png')}
        style={styles.Logo2}
      />
      <Image
        source={require('../../assets/IconInsta.png')}
        style={styles.Logo3}
      />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    Container:{
    flex: 1,                      
    flexDirection: "column",
    justifyContent: "space-between",     
    alignItems: 'center',         
    backgroundColor: '#bb9d9d',   
    paddingTop: 80,
    },
    divHeader:{
      flexDirection: "column",
      margin:0
    },
    TextCadastro:{
        color: "#a85454",
        textAlign: "center",
        alignContent:"center",
    },
    Logo: {
    margin: 0,
    width: 250,          
    height: 100,        
    resizeMode: 'contain'
    },
    Logo2: {
      width: 50,          
      height: 50,
      borderRadius: 25,
      marginHorizontal: 15,
      alignContent: "center",
      alignItems: "center",
      resizeMode: 'contain',
    },
    Logo3: {
      width: 50,          
      height: 50,
      borderRadius: 25,
      marginHorizontal: 15,
      alignContent: "center",
      alignItems: "center",
      resizeMode: 'contain',
    },
    divHome:{
      flexDirection: "row", 
      justifyContent: "center",
      alignItems: 'center',
      width: '100%',    
      height: 80,        
      marginBottom: 20,
      marginTop: -30
    },
    meuBotao1:{
      width: 150,
      height: 50,
      backgroundColor: "#c00000",
      padding: 20,
      borderRadius: 60,
      marginTop: -30
    },
    meuBotao2:{
      width: 150,
      height: 50,
      backgroundColor: "#420c0c",
      padding: 20,
      borderRadius: 60,
      marginTop: -30
    }

})