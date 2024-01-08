import { createContext, useEffect, useState } from "react"


export const Authcontext=createContext();

export function AuthcontextProvider({children}){

    const [currentUser,setCurrentUser]=useState(localStorage.getItem("signed")||false);
    const [userInfo,setUserInfo]=useState(JSON.parse( localStorage.getItem("currentUser")));

    useEffect(()=>{
        localStorage.setItem("currentUser",JSON.stringify(userInfo)) ;
    },[userInfo])

    useEffect(()=>{
        localStorage.setItem("signed",currentUser);
    },[currentUser])

    return( <Authcontext.Provider value={{currentUser,setCurrentUser,userInfo,setUserInfo}}>{children}</Authcontext.Provider>)

}