import React from "react";
import { View, StyleSheet } from "react-native";
import { MessageList, MessageInput, Channel,AudioAttachment } from 'stream-chat-expo'
import { useChatContext } from "./ChatContext";

export const ChannelScreen = (props) => {
  const { channel } = useChatContext(); //to fetch the channel form the selecte channel in the channelList
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput/>
      <AudioAttachment/>
    </Channel>
  );
};

const styles = StyleSheet.create({});
