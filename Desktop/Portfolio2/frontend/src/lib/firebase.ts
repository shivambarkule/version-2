// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXTj6Btf-_bd3M5cIV7jJBSXUw-uBjGwQ",
  authDomain: "shivam-portfoliov2.firebaseapp.com",
  projectId: "shivam-portfoliov2",
  storageBucket: "shivam-portfoliov2.firebasestorage.app",
  messagingSenderId: "175102437419",
  appId: "1:175102437419:web:8bc987e0b32826d398a26e",
  measurementId: "G-HS76GL1S1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };