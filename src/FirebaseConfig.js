// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDqVRyTafqi8GL-ss-xQ9TjPeoOrbkesc",
  authDomain: "react-signup-signin-30e2f.firebaseapp.com",
  projectId: "react-signup-signin-30e2f",
  storageBucket: "react-signup-signin-30e2f.appspot.com",
  messagingSenderId: "698958438207",
  appId: "1:698958438207:web:7aa993a79f141c14fc7d8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;