import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvzC9kx6C_ew8fPRVdc-d3Q4XZ3qiCy7g",
  authDomain: "app-project-chat-c2cb3.firebaseapp.com",
  projectId: "app-project-chat-c2cb3",
  storageBucket: "app-project-chat-c2cb3.firebasestorage.app",
  messagingSenderId: "9388616620",
  appId: "1:9388616620:web:8215ebc258c6b943076809"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }