// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZwPbFw-krkbdmOZLdZzSThBR6_SYU41I",
  authDomain: "wad-project-db.firebaseapp.com",
  databaseURL:
    "https://wad-project-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wad-project-db",
  storageBucket: "wad-project-db.appspot.com",
  messagingSenderId: "884365961730",
  appId: "1:884365961730:web:1fc64913b67a74dadf951b",
  measurementId: "G-J73894Z49K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
