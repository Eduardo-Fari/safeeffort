import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const Cadastro = ({navigation}) => {
  return (
    <View>
      <Text>Cadastro Screen</Text>
      <Button title='Voltar' onPress={()=>{
              navigation.goBack();
            }}/>
      <Button title='Ir para Profile' onPress={()=>{
            navigation.navigate('Profile');
      }}/>
    </View>
  )
}

export default Cadastro

const styles = StyleSheet.create({})