// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get, // Ensure get is imported
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWXkUmUmCZmmATIsQfcdBTszFhOu-IkiM",
  authDomain: "eduapp-775ab.firebaseapp.com",
  databaseURL: "https://eduapp-775ab-default-rtdb.firebaseio.com",
  projectId: "eduapp-775ab",
  storageBucket: "eduapp-775ab.appspot.com",
  messagingSenderId: "420498752186",
  appId: "1:420498752186:web:58dbdc330a7c27db563883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  ref,
  set,
  get, // Export get function
  onAuthStateChanged,
  signOut,
  getAuth,
  getDatabase,
};
