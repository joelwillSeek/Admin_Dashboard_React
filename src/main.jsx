import React from "react"
import {createRoot} from "react-dom/client"
import { BrowserRouter} from "react-router-dom"
import "./css/styles.css"
import {AuthcontextProvider} from "./context/Authcontext"
import App from "./App"


createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
        <AuthcontextProvider>
        <App></App>
        </AuthcontextProvider>
        
        </BrowserRouter>
    
    </React.StrictMode>
    )