// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyjW6WgJg8cXsr961rudQzMNzQyOvJMEQ",
  authDomain: "cuberapp-b9e9a.firebaseapp.com",
  projectId: "cuberapp-b9e9a",
  storageBucket: "cuberapp-b9e9a.firebasestorage.app",
  messagingSenderId: "223116581652",
  appId: "1:223116581652:web:161e75bee0b2a8166c8001"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);       // <-- add this line!
export default app;
