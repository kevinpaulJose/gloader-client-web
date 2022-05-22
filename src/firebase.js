// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDbS0yH5CfFPlbBEHEJm_I_uA3BjzOv4ms",
  // authDomain: "gloader-349706.firebaseapp.com",
  // projectId: "gloader-349706",
  // storageBucket: "gloader-349706.appspot.com",
  // messagingSenderId: "346457672075",
  // appId: "1:346457672075:web:95fff91f4bd99a4e73878e",
  // measurementId: "G-LX330BBDG6",
  apiKey: "AIzaSyBeTXzC4jdPo9UQ7WCwC9SE0AVlt0prhF0",
  authDomain: "gloader-a5426.firebaseapp.com",
  projectId: "gloader-a5426",
  storageBucket: "gloader-a5426.appspot.com",
  messagingSenderId: "451755974190",
  appId: "1:451755974190:web:95b508c8a1664528b989bf",
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
export const firedb = getFirestore(fireApp);
