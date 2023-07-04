import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebase = {
  apiKey: "AIzaSyCFYVFR8ptjmvUz7oQUKOhXpU9EHAvUQcs",
  authDomain: "mytinder-86073.firebaseapp.com",
  databaseURL:
    "https://mytinder-86073-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mytinder-86073",
  storageBucket: "mytinder-86073.appspot.com",
  messagingSenderId: "247583145779",
  appId: "1:247583145779:web:c09bcfcffddc4ed64a8846",
  measurementId: "G-MLTWEHHT7V",
};

export const FIREBASE_APP = initializeApp(firebase);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP);
