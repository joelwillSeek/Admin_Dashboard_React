import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./controllers/Login"
import Dashboard from "./controllers/Dashboard";
import Userstable from "./controllers/Userstable";
import Adminusers from "./controllers/Adminusers";
import Transactions from "./controllers/Transactions";
import Register from "./controllers/Register";
import { Authcontext } from "./context/Authcontext";

export default function App(){


    let {currentUser}=useContext(Authcontext);

    let RequiredAuth=({children})=>{
        return currentUser ? children:<Navigate to={"/"}></Navigate>
    }

    return(
        <>

        <Routes>
            <Route index path="/" element={<Login></Login>}>
               
            </Route>

            <Route path="dashboard" element={<RequiredAuth><Dashboard></Dashboard></RequiredAuth>}>
             
        <Route index path="users" element={<Userstable></Userstable>}></Route>
        <Route path="adminUsers" element={<Adminusers></Adminusers>}></Route>
        <Route path="transaction" element={<Transactions></Transactions>}></Route>

            </Route>

            <Route path="register" element={<Register></Register>}></Route>
        </Routes>
        </>
    )
   
}
