import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCTdtnQCUEFKU2UguXsrvwpMbLeGRO5PLk",
    authDomain: "yoga-checkin.firebaseapp.com",
    databaseURL: "https://yoga-checkin.firebaseio.com",
    projectId: "yoga-checkin",
    storageBucket: "",
    messagingSenderId: "602737132367",
    appId: "1:602737132367:web:20804fdba6433c54"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
