import { initializeApp } from 'firebase/app';
import {getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';

//ref = reference to a 'collection'
import {getDatabase, 
    ref as firebaseDatabaseRef, 
    set as firebaseSet,
    child,
    get,
    onValue
} from 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyD0dplwEnivHDPGFxnAuBeMOhQNyIzFayI",
    authDomain: "chatapp-1ee7d.firebase.com",
    databaseURL: "https://chatapp-1ee7d-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "chatapp-1ee7d",
    storageBucket: "chatapp-1ee7d.appspot.com",
    appId: '1:207117752552:android:36b04953cfc5b2271f515d',
    messagingSenderId: "207117752552"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();

export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet,
    sendEmailVerification,
    child,
    get,
    onValue,
    signInWithEmailAndPassword
}