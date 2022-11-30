import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import {
  ChannelList,
  ChannelListLoadingIndicator,
  ChannelListMessenger,
  OverlayProvider,
  Chat
} from "stream-chat-expo";
import { chatUserId } from "./ChatConfig";
import { useChatContext } from "./ChatContext";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "./ChatConfig";



const chatClient = StreamChat.getInstance(chatApiKey); //fetches the client object
const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort = {
  last_message_at: -1,
};

export const ChannelListScreen = (props) => {
  const { setChannel } = useChatContext();

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChannelList
        filters={filters}
        sort={sort}
          onPress={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate("ChannelScreen");
          }}
          
        />
      </Chat>
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({});
