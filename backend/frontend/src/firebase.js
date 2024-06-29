// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "krishipal-13935.firebaseapp.com",
  projectId: "krishipal-13935",
  storageBucket: "krishipal-13935.appspot.com",
  messagingSenderId: "933169073533",
  appId: "1:933169073533:web:77688cf065d574460f5014",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
