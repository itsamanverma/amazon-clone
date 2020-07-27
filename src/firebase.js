import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCrjHQOtI2mGFNxa1-MG4EmpWrh8IsZI5A",
    authDomain: "clone-9b0b1.firebaseapp.com",
    databaseURL: "https://clone-9b0b1.firebaseio.com",
    projectId: "clone-9b0b1",
    storageBucket: "clone-9b0b1.appspot.com",
    messagingSenderId: "355303332652",
    appId: "1:355303332652:web:aef905b51d3b5bc4db6a89",
    measurementId: "G-02NMFH3SFC",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };