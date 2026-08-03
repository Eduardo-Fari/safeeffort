import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const AboutScreen = ({navigation}) => {
  return (
    <View>
      <Text>aboutScreen</Text>
      <Button title='Voltar' onPress={()=>{
              navigation.goBack();
            }}/>
      <Button title='Ir para Profile' onPress={()=>{
            navigation.navigate('Profile');
      }}/>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({})