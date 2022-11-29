import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ChannelList } from "stream-chat-react-native";
import { chatUserId } from "./ChatConfig";
import { useChatContext } from "./ChatContext";

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
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate("ChannelScreen");
      }}
    />
  );
};

const styles = StyleSheet.create({});
