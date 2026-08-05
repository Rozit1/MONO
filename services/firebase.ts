// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, createUserWithEmailAndPassword, getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseAuth = require("firebase/auth");
const persistence = typeof firebaseAuth?.getReactNativePersistence === "function" ? firebaseAuth.getReactNativePersistence(ReactNativeAsyncStorage) : undefined;

console.log("persistence", typeof firebaseAuth?.getReactNativePersistence, typeof persistence);


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

let app: FirebaseApp | null = null;
let auth: Auth;
// Initialize Firebase
export function initializeFirebase() {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  try {
    auth = initializeAuth(app, { persistence });
  } catch (error) {
    console.log("Error initializing auth", error);
    auth = getAuth(app);
  }
  return { app, auth };
}


export function signUp(fullName: string, email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // return updateProfile(userCredential.user, { displayName: fullName }).then(() => {
      return userCredential;
    });
  };

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function signOut() {
  return signOut();
}

export { app, auth };