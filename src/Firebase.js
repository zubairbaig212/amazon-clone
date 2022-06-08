import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUdvOF_na-xOH6ereEXkfGeRTeECHuY10",
    authDomain: "e-clone-ee0b4.firebaseapp.com",
    projectId: "e-clone-ee0b4",
    storageBucket: "e-clone-ee0b4.appspot.com",
    messagingSenderId: "626624367351",
    appId: "1:626624367351:web:6ba4898384e218ee92a1f2",
    measurementId: "G-FTVSFW85SM"
};

firebase.initializeApp(firebaseConfig)
const db=firebase.firestore();
const firebaseAuth = () => getAuth()
export { db, firebaseAuth }
