// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import {initializeFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey:"AIzaSyD45sP8-YDr5DpO1OfXHzOBIjkt8-PkV_I",
  authDomain: "chatair-691ab.firebaseapp.com",
  projectId: "chatair-691ab",
  storageBucket: "chatair-691ab.appspot.com",
  messagingSenderId: "448885096575",
  appId:"1:448885096575:web:f6accef850d1bdd24b3f4a",
  measurementId: "G-TXX40HXDCJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };
