import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [done, setDone] = useState(false);

  const register = ({ navigation }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const User = userCredential.user;
        updateProfile(User, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        })
          .then(() => {
            alert("Registered ✨");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("An unexpexted error occured");
        console.log("this is the error message: " + errorMessage + " this is the error code: " + errorCode)
      });
  };



  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/thebackground.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your name"
            left={<TextInput.Icon icon="chat" />}
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your email address"
            left={<TextInput.Icon icon="email" />}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your password"
            left={<TextInput.Icon icon="key" />}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your image url"
            left={<TextInput.Icon icon="account" />}
            label="Profile Picture"
            value={avatar}
            onChangeText={(text) => setAvatar(text)}
          />
        </View>

        <Button
          icon="account"
          mode="contained"
          buttonColor="#000"
          textColor="#fff"
          style={{ marginVertical: 10 }}
          onPress={register}
        >
          Create Account
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
  inputView: {
    width: 300,
    height: 100,
  },
});
