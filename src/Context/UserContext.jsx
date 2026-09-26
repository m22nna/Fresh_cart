import { createContext, useEffect } from "react";
import { useState } from "react";

   export let UserContext= createContext();
 export default function UserContextProvider({children}){
    //const [count,setcount]=useState(0);
    const [userToken,setUserToken]=useState(null);
    useEffect(()=>{
if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
}

    },[])
   
    return <UserContext.Provider value={{userToken,setUserToken}}>
        {children}
    </UserContext.Provider>
 }