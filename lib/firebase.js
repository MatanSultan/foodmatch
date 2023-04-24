import firebase from "firebase/app";
import "firebase/analytics";

if (typeof window !== "undefined") {
  const firebaseConfig = {
    // Your firebase configuration object goes here
    // apiKey: "AIzaSyBFTkdPTjQuvpS-BRynH8ai_U-H23SrlEc",
    // authDomain: "food-23453.firebaseapp.com",
    // projectId: "food-23453",
    // storageBucket: "food-23453.appspot.com",
    // messagingSenderId: "979802220869",
    // appId: "1:979802220869:web:271bbc4722bf140d37762c",
    // measurementId: "G-D3KL1K83BF",
  };

  firebase.initializeApp(firebaseConfig);
  if (firebase.analytics.isSupported()) {
    const analytics = firebase.analytics();
  }
}
