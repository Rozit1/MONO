// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYDuu-P7hrH2IklRorKS36i8SPcyW0UmI",
  authDomain: "mono-rojit.firebaseapp.com",
  projectId: "mono-rojit",
  storageBucket: "mono-rojit.firebasestorage.app",
  messagingSenderId: "921467990822",
  appId: "1:921467990822:web:b2c15582c35982638307e7",
  measurementId: "G-YK1BL82890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return auth.signOut();
}