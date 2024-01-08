import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useEffect,useRef,useState } from "react";
import { db } from "./MyAdminFirebase";
import "../css/userstable.css"
import { useNavigate } from "react-router";

export default function usertable(){


    const [userData, setUserData] = useState([]);

    let navigate=useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        let list = [];
        try {
          const res = await getDocs(collection(db, "Users"));
  
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
    updateCurrentList={setUserData}
    currentUser={userData}
    key={index}
    id={doc.UserId}
      Profile={doc.Profile}
      p_num={doc.p_num}
      L_name={doc.L_name}
      ACC_BAL={doc.ACC_BAL}
      ACC_NUM={doc.ACC_NUM}
      DOB={doc.DOB}
      email={doc.email}
      Fam_name={doc.Fam_name}
      F_name={doc.F_name}
      Sex={doc.Sex}>

      </CardLikeUserList>
  )
}

</div>
        </>
        
    )
}

let CardLikeUserList = (
  {
     navigate,
    updateCurrentList,
    currentUser,
    id,
    ACC_BAL,
    ACC_NUM,
    DOB,
    F_name,
    Fam_name,
    L_name,
    Profile,
    Sex,
    email,
    p_num,
  }
  ) => {

    const dateOfBirth=useRef();
    const firstNameRef=useRef();
    const familyNameRef=useRef();
    const lastNameRef=useRef();
    const genderRef=useRef();
    const emailRef=useRef();
    const phoneRef=useRef();

    let handleDeleteClick=async (event)=>{
      
      try{
        await deleteDoc(doc(db,"Users",id));
        updateCurrentList(currentUser.filter((item)=>item.id!==id));
        navigate("dashboard/users"); 
        
      }catch(e){
        console.error(e);
      }
    } 

    

    let handleUpdateClick=async(event)=>{
      try{
        await updateDoc(doc(db, "Users",id), {
          UserId:id,
          Profile:Profile,
          p_num:phoneRef.current.value,
          L_name:lastNameRef.current.value,
          ACC_BAL:ACC_BAL,
          ACC_NUM:ACC_NUM,
          DOB:dateOfBirth.current.value,
          email:emailRef.current.value,
          Fam_name:familyNameRef.current.value,
          F_name:firstNameRef.current.value,
          Sex:genderRef.current.value,
    });
    // navigate("/dashboard/users")
  }catch(e){
    console.error(e);
  }
    }

    return (
      <div className="card" >
        <div className="dark_overlay" 
        style={
          {
            background:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${Profile})`,
            backgroundSize:`cover`,
            backgroundPosition:`center`,
            backgroundRepeat:`no-repeat`,
            }}>
           {/* <p><img src={Profile}></img></p> */}
        <p> Account BAL: {ACC_BAL}</p>
        <p>Account Number: {ACC_NUM}</p>
        <p>Date Of Birth: <input type="text" defaultValue={DOB} ref={dateOfBirth} /> </p>
        <p>First Name: <input type="text" defaultValue={F_name} ref={firstNameRef}/> </p>
        <p>Family Name: <input type="text" defaultValue={Fam_name} ref={familyNameRef}/> </p>
        <p>Last Name: <input type="text" defaultValue={L_name} ref={lastNameRef}/> </p> 
        <p>Gender: <input type="text" defaultValue={Sex} ref={genderRef}/> </p>
        <p>Email: <input type="email" defaultValue={email} ref={emailRef}/> </p>
        <p>Phone: <input type="tel" defaultValue={p_num} ref={phoneRef}/></p>
        <div className="chooseWhatToDO">
        <button className="UpdateUser" onClick={handleUpdateClick}>Update</button>
        <button className="deleteUser" onClick={handleDeleteClick}>Delete</button>
        </div>
       
        
        </div>
        
      </div>
    );
  };