import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./MyAdminFirebase";
import { useNavigate } from "react-router";

export default function adminusers(){
    const [userData, setUserData] = useState([]);

    const navigate=useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        let list = [];
        try {
          const res = await getDocs(collection(db, "previlagedUsers"));
  
          res.forEach((doc) => {
  
            list.push({ id: doc.id, ...doc.data() })
          })
  
          setUserData(list);
  
        } catch (e) {
          console.error(e);
        }
      }
  
      fetchUserData();
    }, []);
  
    console.log(userData);

    return(
        <>
        

<div className="usersTable">


{
  userData.map((doc,index) =>
    <CardLikeUserList
    navigate={navigate}
    key={index}
    updateCurrentList={setUserData}
    currentUser={userData}
    id={doc.UserId}
      Profile={doc.ProfileImage}
      timeStamp={doc.timeStamp.seconds}
      email={doc.UserName}
      password={doc.Password}
      ></CardLikeUserList>
  )
}

</div>
        </>
        
    )
}

let CardLikeUserList = ({
  updateCurrentList,
    currentUser,
  navigate,
    id,
    Profile,
      timeStamp,
      email,
      password
  }) => {

    let handleDeleteClick=async (event)=>{
      
      try{
        await deleteDoc(doc(db,"previlagedUsers",id));
        updateCurrentList(currentUser.filter((item)=>item.id!==id));
      }catch(e){
        console.error(e);
      }
    } 


    return (
      <div className="card"  style={
        {
          padding:`7rem 5rem`,
          background:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${Profile})`,
          backgroundSize:`cover`,
          backgroundPosition:`center`,
          backgroundRepeat:`no-repeat`,
          }}>
         {/* <p><img src={Profile}></img></p> */}
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>timeStamp: {timeStamp}</p>
        <button className="deleteUser" onClick={handleDeleteClick}>Delete</button>
      </div>
    );
  };