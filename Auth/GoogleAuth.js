import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image,Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleContextProvider } from "../Context/GoogleContext";


WebBrowser.maybeCompleteAuthSession();

export const GoogleAuth = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState("");


  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "863133268828-9onk4km3a4vedtud5k9qujg2h2rmtup1.apps.googleusercontent.com",   
  });

  function showUserInfo() {
    if (userInfo) {
     <View style={{backgroundColor:red, width:200,height:200, flex:1}}>
     <Text> hello</Text>
     </View>
    }
  }

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    } 
    if(response?.type==="error"){
      console.log("problem with response")
    }
    if(response?.type==="dismiss"){
      navigation.navigate("chat")
    }
  }, [response]); //fetches the accesstoken once successful

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      console.log(data)
    });
    navigation.navigate("Chat")
  } // fetches the user authenticated id if there is an access token

  return (
    <GoogleContextProvider userInfo={userInfo}>
      {showUserInfo()}
      <TouchableOpacity
        onPress={() => {
        accessToken?getUserData:promptAsync()
        }}
        disabled={!request}
      >
        <View style={styles.provider}>
          <Image
            source={require("../assets/google.jpg")}
            style={{ width: 40, height: 40, backgroundColor: "#000" }}
          />
        </View>
      </TouchableOpacity>
    </GoogleContextProvider>
  );
};

const styles = StyleSheet.create({
  provider: {
    marginTop: 30,
    backgroundColor: "#000",
    width: 300,
    alignItems: "center",
    borderRadius: 15,
  },
});
