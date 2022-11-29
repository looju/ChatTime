import React from "react";
import { View, StyleSheet } from "react-native";
import { MessageList, MessageInput, Channel,Audio } from "stream-chat-react-native";
import { useChatContext } from "./ChatContext";

export const ChannelScreen = (props) => {
  const { channel } = useChatContext(); //to fetch the channel form the selecte channel in the channelList
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
      <Audio/>
    </Channel>
  );
};

const styles = StyleSheet.create({});
