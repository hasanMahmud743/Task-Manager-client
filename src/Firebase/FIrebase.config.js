// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4rTHGQr1sWDW8qnylTEQcAshKPM265PM",
  authDomain: "task-manager-23d72.firebaseapp.com",
  projectId: "task-manager-23d72",
  storageBucket: "task-manager-23d72.appspot.com",
  messagingSenderId: "162034451401",
  appId: "1:162034451401:web:b85a1c8c3236ce7b005e18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app