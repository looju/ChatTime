import React,{createContext} from 'react';


export const SlackContext = createContext();

export const SlackContextProvider = ({children,slackInfo}) => {
    return(
        <SlackContext.Provider value={{slackInfo}}>
           {children}
        </SlackContext.Provider> 
    )
}
   


