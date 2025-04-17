// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbe4dzhp3bCHIkM-le8Gn70H-nXsYQ_NE",
  authDomain: "expense-tracker-c7927.firebaseapp.com",
  projectId: "expense-tracker-c7927",
  storageBucket: "expense-tracker-c7927.firebasestorage.app",
  messagingSenderId: "142337143502",
  appId: "1:142337143502:web:cd0fccfc3fd3cdc7d7d69f",
  measurementId: "G-XLKXNHK20F"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);



const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);



export {db , auth, storage};
export default {db , auth, storage};