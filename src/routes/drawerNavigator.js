import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InicioScreen from '../screens/inicio';
import ContatosScreen from '../screens/contatos';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle} />
        <Text style={styles.profileName}>Safe Effort conta</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: '#FFFFFF' },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tab.Screen name="InícioTab" component={InicioScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="ContatosTab" component={ContatosScreen} options={{ title: 'Contatos (Sênior)' }} />
    </Tab.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#D9534F',
        drawerStyle: { backgroundColor: '#82C0B3', width: 250 },
        drawerLabelStyle: { color: '#FFFFFF', fontSize: 16 },
      }}
    >
      <Drawer.Screen name="HomeTabs" component={TabNavigator} options={{ title: 'Home' }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, backgroundColor: '#82C0B3', paddingTop: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  avatarCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#B2E2D8', marginBottom: 8 },
  profileName: { color: '#FFFFFF', fontSize: 14 },
});