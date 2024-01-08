import { NavLink } from "react-router-dom";
import "../css/navBar.css";

export default function navbar(){
    return(
        <>
        <div className="FAB">
        <NavLink to={"users"} className={"prettyFAB cornersLeft"}>Users</NavLink>
      <NavLink to={"adminUsers"} className={"prettyFAB"}>Admin</NavLink>
      <NavLink to={"transaction"} className={"prettyFAB cornersRight"}>Transaction</NavLink>
        </div>
      
        </>
    )
}