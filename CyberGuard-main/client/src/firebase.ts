// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc9q1U8j8Z0qzQLb4NKeTAtLtz9DFXxdk",
  authDomain: "cyber-a740c.firebaseapp.com",
  projectId: "cyber-a740c",
  storageBucket: "cyber-a740c.firebasestorage.app",
  messagingSenderId: "255785556557",
  appId: "1:255785556557:web:5f518507b73c024de99a04",
  measurementId: "G-3B50KXRLJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
