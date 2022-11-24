import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { GiftedChat } from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { userContext } from "./Login";



export const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const {userInfo}=useContext(userContext)

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log("Error logging out at Chat.js " + error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={(marginLeft = 25)}>
          <Avatar.Image
            source={{ uri: auth?.currentUser?.photoURL || userInfo.image}}
            size={24}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOutNow}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ top: 2 }}>
              <MaterialCommunityIcons name="logout" size={15} />
            </View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Welcome to ChatTime",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "John",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, [navigation]); //this component sets up random messages on load

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(db, "chats"), { _id, createdAt, text, user }); //addding the message object values to the database
  });

  return (
    <View style={{backgroundColor:"#000"}}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email || userInfo.email,
          name: auth?.currentUser?.displayName || userInfo.name,
          avatar: auth?.currentUser?.photoURL || userInfo.image,
        }}
        showAvatarForEveryMessage={true}
        placeholder="Type a message"
        isLoadingEarlier={true}
        isTyping={true}
        multiLine
        style={{backgroundColor:"#000"}}
      />
    </View>
  );
};
