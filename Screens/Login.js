import { NavigationHelpersContext } from "@react-navigation/native";
import React, { useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Text,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { TextInput, Button } from "react-native-paper";
import { useFonts, Lusitana_400Regular } from "@expo-google-fonts/dev";
import { SlackAuth } from "../Auth/SlackAuth";
import { GoogleAuth } from "../Auth/GoogleAuth";

WebBrowser.maybeCompleteAuthSession();

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  //for firebase signin with email and password
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        navigation.navigate("Chat");
      })
      .catch((error) => {
        alert("An unexpected problem occured");
        console.log("problem with signin process at Login.js " + error.message);
      });
  };

  let [fontsLoaded] = useFonts({
    Lusitana_400Regular,
  });

  if (fontsLoaded) {
    return (
      <ScrollView>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("../assets/background.jpg")}
        >
          <View style={styles.container}>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Enter your email address"
                label="Email"
                left={<TextInput.Icon icon="email" />}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Enter your password"
                label="Password"
                left={<TextInput.Icon icon="key" />}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputView}>
              <Button
                icon="login"
                mode="contained"
                buttonColor="#000"
                textColor="#fff"
                style={{ marginVertical: 10 }}
                onPress={signIn}
              >
                Login
              </Button>
              <Button
                icon="draw-pen"
                mode="contained"
                buttonColor="#000"
                textColor="#fff"
                style={{ marginVertical: 10 }}
                onPress={navigateToRegister}
              >
                Register
              </Button>
            </View>
            <View style={styles.text}>
              <Text
                style={{
                  fontSize: 15,
                  fontStyle: "Lusitana_400Regular",
                  fontWeight: "bold",
                  color:"#fff"
                }}
              >
                ━━━━━━━━OR SIGN IN WITH━━━━━━━━
              </Text>
            </View>
            <GoogleAuth />
            <SlackAuth />
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 100,
  },
  backgroundImage: {
    height: 800,
  },
  inputView: {
    height: 100,
    width: 300,
  },
  text: {
    marginTop: 40,
  },
  provider: {
    marginTop: 30,
    backgroundColor: "#000",
    width: 300,
    alignItems: "center",
    borderRadius: 5,
  },
});
