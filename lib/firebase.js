// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFTkdPTjQuvpS-BRynH8ai_U-H23SrlEc",
  authDomain: "food-23453.firebaseapp.com",
  projectId: "food-23453",
  storageBucket: "food-23453.appspot.com",
  messagingSenderId: "979802220869",
  appId: "1:979802220869:web:271bbc4722bf140d37762c",
  measurementId: "G-D3KL1K83BF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
