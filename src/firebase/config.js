// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwa4GNm-jEwyRX-N4ZQeZBYLxAHV8TVVQ",
    authDomain: "post-office-delivery-helper.firebaseapp.com",
    projectId: "post-office-delivery-helper",
    storageBucket: "post-office-delivery-helper.firebasestorage.app",
    messagingSenderId: "538183543199",
    appId: "1:538183543199:web:04c48868fd868c376175aa",
    measurementId: "G-X2Q5L7DN3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
