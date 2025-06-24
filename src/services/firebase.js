import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRUEbx4reWiVcTwokcT4v4gnD6AG2P2h0",
  authDomain: "lab-201-7e147.firebaseapp.com",
  projectId: "lab-201-7e147",
  storageBucket: "lab-201-7e147.firebasestorage.app",
  messagingSenderId: "410129685346",
  appId: "1:410129685346:web:756cb6897d285ce817ea3b",
  measurementId: "G-1FJTSD3X0D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
