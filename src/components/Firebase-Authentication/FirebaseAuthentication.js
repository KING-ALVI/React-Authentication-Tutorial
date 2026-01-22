// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsKTH9qLOjUZ6_rJYWXwkph30nd5S0aHE",
    authDomain: "react-authentication-tut-864da.firebaseapp.com",
    projectId: "react-authentication-tut-864da",
    storageBucket: "react-authentication-tut-864da.firebasestorage.app",
    messagingSenderId: "788582857829",
    appId: "1:788582857829:web:18a0cd166904dc09835a8c",
    measurementId: "G-GXEP75HSSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  