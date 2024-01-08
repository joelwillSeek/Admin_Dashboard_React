import { collection, getDocs } from "firebase/firestore";
import { db } from "./MyAdminFirebase";
import { useEffect, useState } from "react";
import "../css/transacitons.css"

export default function transactions(){
    const [userData, setUserData] = useState([]);

    getDocs

    useEffect(() => {
      const fetchUserData = async () => {
        let list = [];
        try {
          const res = await getDocs(collection(db, "Transactions"));
  
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
        

<div className="usersTable ">

{
  userData.map((doc,index) =>
    <CardLikeUserList
    key={index}
      userID={doc.UserID}
      amount={doc.amount}
      date={doc.date}
      doneVia={doc.doneVia}
      transactionBy={doc.transactionBy}
      transactionCatagory={doc.transactionCategory}
      ></CardLikeUserList>
  )
}

</div>
        </>
        
    )
}

let CardLikeUserList = ({
    userID,
    amount,
    date,
    doneVia,
    transactionBy,
    transactionCatagory
  }) => {
    return (
      <div className="card transactions">
       <p className="id">UserID: {userID}</p> 
        <p>Amount: {amount}</p>
        <p>Date: {date}</p>
        <p>Done Via: {doneVia}</p>
        <p>Transaction By: {transactionBy}</p>
        <p>Transaction Category: {transactionCatagory}</p>
      </div>
    );
  };