import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyC_m67PnOHf8T4o3RrhzW2fqwOXFMjBhMs',
    authDomain: 'todo-app-cp-17f71.firebaseapp.com',
    projectId: 'todo-app-cp-17f71',
    storageBucket: 'todo-app-cp-17f71.appspot.com',
    messagingSenderId: '130433985659',
    appId: '1:130433985659:web:560bca423f67dce615c6de',
    measurementId: 'G-CBM6SQFLDS',
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db;
