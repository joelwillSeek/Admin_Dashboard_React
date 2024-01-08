import {  signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Auth from "./MyAdminFirebase"
import {Authcontext} from "../context/Authcontext";

export default function Login(){
    let [userName,setUserName]=useState("");
    let [password,setPassword]=useState("");
    let navigate=useNavigate()

    let [error,setError]=useState(false);

    let {setCurrentUser,setUserInfo}=useContext(Authcontext)


    let handlingSubmition=(event)=>{
        event.preventDefault();

        signInWithEmailAndPassword(Auth,userName,password).then((userCredentional)=>{
     
            navigate("dashboard/users")

            setUserInfo({userInfo:userCredentional.user})
            setCurrentUser(true);
            
            setError(false); 
        }).catch((error)=>{
            console.table(error)
            setError(true)
        })
    }
    
    return ( <>

<form onSubmit={handlingSubmition} className="loginMe">
        <h1>Login</h1>
        <label htmlFor="username">User Name</label>
        <input name="username" id="username" placeholder="Type your username" onChange={(event)=>{setUserName(event.target.value)}}/>
        <label htmlFor="userpassword">User Password</label>
        <input type="password" name="userpassword" id="userpassword" placeholder="Type your password" onChange={(event)=>{setPassword(event.target.value)}}/>
        <a href="#" id="forget">Forget password?</a>
        {
            error && <span style={{color:"red"}}>Wrong email or password</span>
        }
        
        <button className="loginBtn" type="submit">LOGIN</button>

        <p>Don't have an account? <a onClick={()=>{navigate("register")}}>Sign up</a></p>
       
    </form>

    </> )
}