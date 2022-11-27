import React,{createContext} from 'react';


export const GoogleContext = createContext();

export const GoogleContextProvider = ({children,userInfo}) => {
    return(
        <GoogleContext.Provider value={{userInfo}}>
           {children}
        </GoogleContext.Provider> 
    )
}
   

