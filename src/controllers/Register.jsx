import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import Auth, { db, storage } from "./MyAdminFirebase";
import { useNavigate } from "react-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


export default function registor(){

    let [error,setError]=useState(false);
    let [errorConfirm,setErrorConfirm]=useState(false);
    let [profilePic,setProfilePic]=useState("");
    let [stopSubmition,setStopSubmition]=useState(null);

    let [confirmPassword,setConfirmPassword]=useState("");
    let [password,setPassword]=useState("");
    let [userName,setUserName]=useState("");
    const [uploadableImage,setUploadableImage]=useState(null);
    let navigate=useNavigate();

    useEffect(()=>{

        const uploadImage=()=>{
            const name=new Date().getTime()+profilePic.name;

            const storageRef=ref(storage,profilePic.name);
            const uploadTask=uploadBytesResumable(storageRef,profilePic)
            

            uploadTask.on("state_changed",(snapshot)=>{
                const Progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log("Upload is"+Progress+"& done");
                setStopSubmition(Progress)
                switch(snapshot.state){
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },(error)=>{
                console.error(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
                    setUploadableImage(downloadURL)
                })
            })


        }

        (profilePic && uploadImage());
    },[profilePic])

    let handlingSubmition= async (event)=>{
        event.preventDefault();

        if(password!=confirmPassword){
            setErrorConfirm(true);
        }else{
            try{
                let createdUser=await createUserWithEmailAndPassword(Auth,userName,password);
                await setDoc(doc(db,"previlagedUsers",createdUser.user.uid),{
                    UserName:userName,
                    Password:password,
                    ProfileImage:uploadableImage,
                    timeStamp:serverTimestamp(),
                })
                navigate("/")
                setError(false);
            }catch(err){
                console.error(err)
            }
        }
    }

    return(
        <>

         <form onSubmit={handlingSubmition} className="phoneMe">

        <h1>Registor</h1>

        <img id="previewImage"/>
        <label htmlFor="profilepic" id="replacerFile">Choose Profile Picture</label>
        <input 
        type="file" 
        accept=".jpg,.png,.jpeg,.svg" 
        name="profilepic" 
        id="profilepic" 
        placeholder="Profile Picture" 
        onChange={(event)=>{
            setProfilePic(event.target.files[0]);
            /**
             * @type {HTMLLabelElement}
             */
            let lableTag=document.querySelector("label#replacerFile")
            lableTag.textContent=event.target.files[0].name;
            /**
             * @type {HTMLImageElement}
             */
            let imagePreview=document.querySelector("img#previewImage");
            let url=URL.createObjectURL(event.target.files[0]);
            imagePreview.src=url;
            

        }}/>

        <label htmlFor="username">User Name</label>
        <input type="text" name="username" id="username" placeholder="Type Your Username" onChange={(event)=>{setUserName(event.target.value)}}/>

        <label htmlFor="userpassword">User Password</label>
        <input type="password" name="userpassword" id="userpassword" placeholder="Type Your Password" min="6" onChange={(event)=>{setPassword(event.target.value)}}/>
       
        <label htmlFor="userconfirmpassword">User Confirm Password</label>
        <input type="password" min="6" name="userconfirmpassword" id="userconfirmpassword" placeholder="Type Your Confirm Password" onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
        {
            error && <span style={{color:"red"}}>Wrong email or password</span>
        }

        {
            errorConfirm && <span style={{color:"red"}}>password filed are not the same</span>
        } 
       
        <button disabled={stopSubmition!==null && stopSubmition<100} className="registorBtn" type="submit">Registor</button>
    </form>
        </>
    )
}