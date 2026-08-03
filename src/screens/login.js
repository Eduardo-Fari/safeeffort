import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const Login = ({navigation}) => {
  return (
    <View>
      <View>
        <img src={require('../assets/logo.png')} style={styles.Logo} />
      </View>
      <View>
      <Text>Login Screen</Text>
      <Button title='Voltar' onPress={()=>{
              navigation.goBack();
            }}/>
      <Button title='Ir para About' onPress={()=>{
            navigation.navigate('About');
      }}/>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})