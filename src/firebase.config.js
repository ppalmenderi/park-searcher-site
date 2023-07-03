// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo2vDZ_AkbkN_RR9cqgTXosYsdpWHjxHg",
  authDomain: "park-searcher.firebaseapp.com",
  projectId: "park-searcher",
  storageBucket: "park-searcher.appspot.com",
  messagingSenderId: "617938075992",
  appId: "1:617938075992:web:5dd0eb5bca160e5556252d",
  measurementId: "G-QVCLJ4PEM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const analytics = getAnalytics(app);