import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, initializeAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Firestore, initializeFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseAuth = require("firebase/auth");
const persistence = Platform.OS === 'web'
  ? browserLocalPersistence
  : typeof firebaseAuth?.getReactNativePersistence === "function"
    ? firebaseAuth.getReactNativePersistence(ReactNativeAsyncStorage)
    : undefined;

    console.log('persistence', persistence, typeof window, typeof firebaseAuth?.getReactNativePersistence);

const firebaseConfig = {
  apiKey: "AIzaSyBYDuu-P7hrH2IklRorKS36i8SPcyW0UmI",
  authDomain: "mono-rojit.firebaseapp.com",
  projectId: "mono-rojit",
  storageBucket: "mono-rojit.firebasestorage.app",
  messagingSenderId: "921467990822",
  appId: "1:921467990822:web:b2c15582c35982638307e7",
  measurementId: "G-YK1BL82890"
};

// Update the firestore rules to allow read and write access to logged in user's data
//rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {

//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;

//       match /transactions/{transactionId} {
//         allow read, write: if request.auth != null
//                             && request.auth.uid == userId;
//       }
//     }
//   }
// }

let app: FirebaseApp | null = null;
let auth: Auth;
let firestore: Firestore;

// Initialize Firebase
export function initializeFirebase() {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  try {
    auth = initializeAuth(app, { persistence });
  } catch (error) {
    console.log("Error initializing auth", error);
    auth = getAuth(app);
  }
  firestore = initializeFirestore(app, {})
  return { app, auth, firestore };
}


export function signUp(fullName: string, email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    return updateProfile(userCredential.user, { displayName: fullName }).then(() => {
      return userCredential;
    });
  });
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function signOut() {
  return signOut();
}

export { app, auth, firestore };