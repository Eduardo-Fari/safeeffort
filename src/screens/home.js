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
      <View style={styles.divButao}>
      <TouchableOpacity style={styles.meuBotao1} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textoBotao1}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.meuBotao2} onPress={() => navigation.replace('Cadastro')}>
        <Text style={styles.textoBotao2}>Criar conta</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.divIcons}>
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
    backgroundColor: '#fffefd',
    gap: 45
    },
    divHeader:{
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      margin:0,
      borderBottomWidth: 1,
      borderBottomColor:"#e06641"
    },
    TextHeader:{
        color: "#41E0B6",
        textAlign: "center",
        alignContent:"center",
        fontSize: 60,
        marginTop: -30
    },
    Logo: {
    margin: 0,
    width: 450,          
    height: 275,        
    resizeMode: "cover",
    opacity: "80%"
    },
    divIcons:{
      flexDirection: "row", 
      justifyContent: "center",
      alignItems: 'center',
      width: '100%',    
      height: 80,        
      marginBottom: 20,
      marginTop: -30
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
    divButao:{
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 50
    },
    meuBotao1:{
      width: 200,
      height: 50,
      backgroundColor: "#558b7d",
      padding: 20,
      borderRadius: 10,
      marginTop: -30,
      alignContent: "center",
      justifyContent:"center"
    },
    meuBotao2:{
      width: 200,
      height: 50,
      backgroundColor: "#e06641",
      padding: 20,
      borderRadius: 10,
      marginTop: -30,
      alignContent: "center",
      justifyContent:"center"
    },
    textoBotao1:{
      color: "#ffffff",
      alignSelf: "center",
      fontSize: 30
    },
    textoBotao2:{
       color: "#ffffff",
      alignSelf: "center",
      fontSize: 30
    }

})