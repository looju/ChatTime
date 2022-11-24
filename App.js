import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./Screens/Login";
import { Register } from "./Screens/Register";
import { Chat } from "./Screens/Chat";
import { Splash } from "./Screens/Splash";
import { Login as LoginProvider } from "./Screens/Login";

// const firebaseConfig = {
//   apiKey:"AIzaSyD45sP8-YDr5DpO1OfXHzOBIjkt8-PkV_I",
//   authDomain: "chatair-691ab.firebaseapp.com",
//   projectId: "chatair-691ab",
//   storageBucket: "chatair-691ab.appspot.com",
//   messagingSenderId: "448885096575",
//   appId:"1:448885096575:web:f6accef850d1bdd24b3f4a",
//   measurementId: "G-TXX40HXDCJ",
// };

// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
   
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}
