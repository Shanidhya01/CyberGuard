// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlcQIBT588AJGOd2GoEH62K6D357AzF0Q",
  authDomain: "hackathon-fd8ca.firebaseapp.com",
  projectId: "hackathon-fd8ca",
  storageBucket: "hackathon-fd8ca.firebasestorage.app",
  messagingSenderId: "217244689255",
  appId: "1:217244689255:web:7e41cb33879e8182e585c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);