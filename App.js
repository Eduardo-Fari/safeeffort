import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home.js";
import Login from "./src/screens/Login.js";
import SplashScreen from "./src/screens/SplashScreen.js"; 
import Cadastro from "./src/screens/Cadastro.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen}
      options={{headerBackVisible: false}}
      />
      <Stack.Screen name="Home" 
      component={Home}
      options={{title: "welcome", headerBackVisible: false}}
      />
      <Stack.Screen name="Profile" component={Login}
      options={{headerBackVisible: false}}
      />

      <Stack.Screen name="Cadastro" component={Cadastro}
      options={{headerBackVisible: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>    
  );
}
//