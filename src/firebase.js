// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebase authentication 사용
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8KIcAR-NtPFgt19kdCAjcY6uWk1ORKH8",
  authDomain: "react-disney-plus-app-4bd90.firebaseapp.com",
  projectId: "react-disney-plus-app-4bd90",
  storageBucket: "react-disney-plus-app-4bd90.appspot.com",
  messagingSenderId: "1034247023922",
  appId: "1:1034247023922:web:08bb890b7d509a3c9abb2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;