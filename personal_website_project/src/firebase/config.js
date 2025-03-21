// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByab2z_y8wAjoLchDFqoKJ9W_a1yhF2k4",
  authDomain: "personal-website-21c58.firebaseapp.com",
  projectId: "personal-website-21c58",
  storageBucket: "personal-website-21c58.firebasestorage.app",
  messagingSenderId: "574715090108",
  appId: "1:574715090108:web:84785ee34d80139792ecb9",
  measurementId: "G-ES8LX6P60D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)