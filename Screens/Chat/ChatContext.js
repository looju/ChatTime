import React,{useState,createContext,useContext} from 'react';
import {View, StyleSheet} from 'react-native';

export const ChatContext=createContext({
    channel:null,
    setChannel:(channel)=>{},
    thread:null,
    setThread:(thread)=>{}
})

export const ChatContextProvider = ({children}) => {

    const [channel, setChannel]=useState()
    const [thread,setThread]=useState()

    return (
        <ChatContext.Provider
        value={{
            channel,
            setChannel,
            thread,
            setThread
        }}
        >
         {children}
        </ChatContext.Provider>
    );
}

export const useChatContext = () => useContext(ChatContext);


