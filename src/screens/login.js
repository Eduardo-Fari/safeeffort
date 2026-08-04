import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}) => {
  return (
    <View>
      <View>
        <Image source={require('../../assets/IconLogin.png')} style={styles.Logo} />
      </View>
      <View>
      <Text></Text>
      <Text></Text>
      <Button title='Login' onPress={()=>{
              navigation.goBack();
      }}/>
      </View>
      <View>
      <Text>Não possui Conta?</Text>
      <Button title='Criar Conta' onPress={()=>{
            navigation.navigate('Home');
      }}/>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Logo: { width: 100, height: 100 } 
})