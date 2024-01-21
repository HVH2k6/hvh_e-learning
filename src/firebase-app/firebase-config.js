import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDgPZ4gg_UwMed1vlnoygj7GzN58dYMToc",
  authDomain: "hvh-e-learning.firebaseapp.com",
  projectId: "hvh-e-learning",
  storageBucket: "hvh-e-learning.appspot.com",
  messagingSenderId: "904424935210",
  appId: "1:904424935210:web:e13f3219c25ad32ee71853"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
