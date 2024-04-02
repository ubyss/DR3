// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0MpCkJVtGSaYk5cXP0AaLq4hKma7ZQ_0",
    authDomain: "dr3at-c751d.firebaseapp.com",
    projectId: "dr3at-c751d",
    storageBucket: "dr3at-c751d.appspot.com",
    messagingSenderId: "1091861583479",
    appId: "1:1091861583479:web:b9d9e8e8a9ebd95625d872",
    measurementId: "G-MDGFW5JG98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;