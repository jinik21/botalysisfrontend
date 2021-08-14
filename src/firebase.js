import firebase from 'firebase';
import "firebase/firebase-database";

const firebaseConfig = {
  apiKey: "AIzaSyCz8UgubGXywwpD8xyFFkco6aafczNWMNo",
  authDomain: "botalysis.firebaseapp.com",
  projectId: "botalysis",
  storageBucket: "botalysis.appspot.com",
  messagingSenderId: "213553558787",
  appId: "1:213553558787:web:e1a965b1f3bf1122776536",
  measurementId: "G-X0GMEMYTHN"
};

firebase.initializeApp(firebaseConfig);

export default firebase;