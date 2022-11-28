import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useChatClient } from "./ChatClient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ChatContextProvider } from "./ChatContext";
import { Chat, OverlayProvider } from "stream-chat-react-native";
import { chatApiKey } from "./ChatConfig";
import { StreamChat } from "stream-chat";
import {ChannelListScreen} from './ChannelListScreen'

const chatClient = StreamChat.getInstance(chatApiKey); //fetches the client object

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen</Text>;

const NavigationStack = () => {
  const { clientIsReady } = useChatClient(); //checks user connect status
  if (!clientIsReady) {
    <Text>Loading Chat</Text>;
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ChannelListScreen" component={ChannelListScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export const ChatInterface = () => {
  return (
    <ChatContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ChatContextProvider>
  );
};
