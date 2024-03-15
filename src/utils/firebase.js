// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8xpB5FikBm3uCAFBCz9nXnRnICSUzn1I",
  authDomain: "see-gpt.firebaseapp.com",
  projectId: "see-gpt",
  storageBucket: "see-gpt.appspot.com",
  messagingSenderId: "618599436503",
  appId: "1:618599436503:web:8fd56cca0fd842aa6e2092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

