import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/home.js";
import LoginScreen from "./src/screens/login.js";
import SplashScreen from "./src/screens/splashscreen.js"; 
import CadastroScreen from "./src/screens/cadastro.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen}
      options={{headerBackVisible: false,
        headerShown: false,
        title:""
      }}
      />
      <Stack.Screen name="Home" 
      component={HomeScreen}
      options={{title: "",
      headerBackVisible: false, 
      headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen}
      options={{title: "",
      headerBackVisible: true, 
      headerShown: false}}
      />

      <Stack.Screen name="Cadastro" component={CadastroScreen}
      options={{title: "",
      headerBackVisible: true, 
      headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>    
  );
}
//