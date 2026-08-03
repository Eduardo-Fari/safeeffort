import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";
import AboutScreen from "./src/screens/AboutScreen.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" 
      component={HomeScreen}
      options={{title: '(º_º)'}}
      />
      <Stack.Screen name="Profile" component={ProfileScreen}
      options={{headerBackVisible: false}}
      />
      <Stack.Screen name="About" component={AboutScreen}/>
    </Stack.Navigator>
  </NavigationContainer>    
  );
}
//