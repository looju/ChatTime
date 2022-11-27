import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useFonts, Arizonia_400Regular } from "@expo-google-fonts/dev";
import Lottie from "lottie-react-native";

export const Splash = ({ navigation }) => {
  useEffect(()=>{
    setTimeout(()=>{
    navigation.replace("Login")
    },6000)
  },[])

  let [fontsLoaded] = useFonts({
    Arizonia_400Regular,
  });

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Lottie autoPlay loop source={require("../assets/Chat.json")} style={{marginBottom:30}}/>
        <View style={styles.view}>
          <Text style={styles.text}>ChatTime</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "#ffffff",
    fontFamily: "Arizonia_400Regular",
  },
  view: {
    alignItems: "center",
    marginTop: 500,
  },
  container:{
    flex:1,
    backgroundColor: "#000",
  }
});
