import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useFonts, Arizonia_400Regular } from "@expo-google-fonts/dev";

export const Splash = ({ navigation }) => {

  useEffect(()=>{
    setTimeout(()=>{
    navigation.replace("Login")
    },6000)
  },[])
 
  let [fontsLoaded] = useFonts({
    Arizonia_400Regular,
  });

  if(fontsLoaded){
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/splashscreen.jpg")}
      >
        <View style={styles.view}>
          <Text style={styles.text}>ChatTime</Text>
        </View>
      </ImageBackground>
    );
  }
 
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "#ffffff",
    fontFamily: "Arizonia_400Regular",
  },
  view:{
    alignItems: "center",
    marginTop:500
    
  }
});
