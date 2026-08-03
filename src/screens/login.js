import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const ProfileScreen = ({navigation}) => {
  return (
    <View>
      <Text>profileScreen</Text>
      <Button title='Voltar' onPress={()=>{
              navigation.goBack();
            }}/>
      <Button title='Ir para About' onPress={()=>{
            navigation.navigate('About');
      }}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})