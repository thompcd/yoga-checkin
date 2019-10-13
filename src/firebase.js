import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBJszROkyTunBp03Cxj9ZrBvrIDYdjjeNk",
  authDomain: "class-scheduler-13cf9.firebaseapp.com",
  databaseURL: "https://class-scheduler-13cf9.firebaseio.com",
  projectId: "class-scheduler-13cf9",
  storageBucket: "class-scheduler-13cf9.appspot.com",
  messagingSenderId: "1018249606667",
  appId: "1:1018249606667:web:00977af7764ec0ee0f790e",
  measurementId: "G-ZV0XNB0EJ3"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
