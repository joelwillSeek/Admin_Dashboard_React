import "../css/dashboard.css";
import {Outlet} from "react-router";
import Navbar from "./Navbar";

export default function dashboard (){


  return (
    <>
    <Navbar/>
    <Outlet></Outlet>   
    </>
  );
};


