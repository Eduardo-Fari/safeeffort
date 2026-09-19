import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import das suas telas de fluxo de autenticação
import HomeScreen from "./src/screens/home.js";
import LoginScreen from "./src/screens/login.js";
import SplashScreen from "./src/screens/splashscreen.js"; 
import CadastroScreen from "./src/screens/cadastro.js";

// Import do DrawerNavigator que une as Tabs + Menu Lateral
import DrawerNavigator from "./src/routes/drawerNavigator.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen}
          options={{ headerBackVisible: false, headerShown: false, title: "" }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: "", headerBackVisible: false, headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: "", headerBackVisible: true, headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen}
          options={{ title: "", headerBackVisible: true, headerShown: false }}
        />
        {/* A rota 'Inicio' chama o navegador com Drawer e Tabs */}
        <Stack.Screen 
          name="Inicio" 
          component={DrawerNavigator}
          options={{ title: "", headerBackVisible: false, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}