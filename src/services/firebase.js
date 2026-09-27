import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCjJxJMrQDtnw1gCX7_-QRL0ckPdaGQmo",
  authDomain: "newcommerce-eea8c.firebaseapp.com",
  projectId: "newcommerce-eea8c",
  storageBucket: "newcommerce-eea8c.firebasestorage.app",
  messagingSenderId: "220345916556",
  appId: "1:220345916556:web:83dee25eb8103b6d9aefa9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);