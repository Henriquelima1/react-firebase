import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA95XbyEjX-q5hI5Yb4o1ycnKTpIgxoFG8",
    authDomain: "react-firebase-f3878.firebaseapp.com",
    projectId: "react-firebase-f3878",
    storageBucket: "react-firebase-f3878.appspot.com",
    messagingSenderId: "10626677490",
    appId: "1:10626677490:web:4f325dd2ecbc0ceed76e6b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };