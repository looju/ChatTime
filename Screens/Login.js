import { NavigationHelpersContext } from "@react-navigation/native";
import React, { useState, useEffect, useRef, createContext } from "react";
import * as Google from "expo-auth-session/providers/google";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SlackAuth } from "../Auth/SlackAuth";

WebBrowser.maybeCompleteAuthSession();

export const userContext = createContext(); // we are using the context api because we want to display the user data in the chat component

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "863133268828-9onk4km3a4vedtud5k9qujg2h2rmtup1.apps.googleusercontent.com",
  });

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      navigation.navigate("Chat");
    }
  }, [response]); //fetches the accesstoken once successful

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `bearer${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      navigation.navigate("Chat");
    });
  } // fetches the user authenticated id if there is one already available

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
      <userContext.Provider value={{ userInfo }}>
        <ScrollView>
          <ImageBackground
            style={styles.backgroundImage}
            resizeMode="cover"
            source={require("../assets/thebackground.jpg")}
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
                  }}
                >
                  ━━━━━━━━OR SIGN IN WITH━━━━━━━━
                </Text>
              </View>

              <TouchableOpacity onPress={promptAsync()}>
                <View style={styles.provider}>
                  <MaterialCommunityIcons
                    size={32}
                    name="google"
                    color="#ff0000"
                  />
                </View>
              </TouchableOpacity>
              <SlackAuth />
            </View>
          </ImageBackground>
        </ScrollView>
      </userContext.Provider>
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
    borderRadius:5,
  },
});
