import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  chatApiKey,
  chatUserId,
  chatUserToken,
  chatUserName,
} from "./ChatConfig";

const chatClient = StreamChat.getInstance(chatApiKey);

const user = {
  id: chatUserId,
  name: chatUserName,
};

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setUpClient = async () => {
      try {
        chatClient.connectUser(user, chatUserToken); //open a websocket connection
        setClientIsReady(true);
      } catch (error) {
        console.log("Error setting up user at ChatClient.js " + error);
      }
    };

    if(!chatClient.userID){
      setUpClient() //if no userID found
    }
  
  }, []);

 
  return {
    clientIsReady,
  };
};
