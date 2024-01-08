// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCGT1TteUdg-eJK8ZBzZmat095sUoRo_rg",
  authDomain: "mobilebankingnepay.firebaseapp.com",
  projectId: "mobilebankingnepay",
  storageBucket: "mobilebankingnepay.appspot.com",
  messagingSenderId: "390152514509",
  appId: "1:390152514509:web:e37a388b44a3aea6fcf284",
  measurementId: "G-7L8126W0ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app)
export default getAuth();