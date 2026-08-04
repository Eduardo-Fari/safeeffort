import { StyleSheet, Text, View, Button, Image} from 'react-native'
import React, { useEffect } from 'react'
import { Assets } from '@react-navigation/elements';

const SplashScreen = ({navigation}) => {
   useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);
  return (  
    <View style={styles.ContainerSplash}>
      <Image source={require('../../assets/iconeApp.png')} style={styles.logo}/>
      <Text style={styles.TextSplash}>Safe Effort</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
ContainerSplash:{
    flex: 1,                      
    justifyContent: 'center',     
    alignItems: 'center',         
    backgroundColor: '#6fca4b',   
    padding: 20,
    flexDirection: "column",
    },
  TextSplash:{
    marginTop: 10,
      color: "#a85454",
      textAlign: "center",
      alignContent:"center",
      fontSize: 20
    },
  logo: {
    marginTop: -40,
    borderRadius: 100,
    width: 200,          
    height: 200,       
    resizeMode: 'contain',
  },
})