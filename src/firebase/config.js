import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5yuDpquOz-9s6TaeSull0rUmHGby347c",
  authDomain: "spent-a04ce.firebaseapp.com",
  projectId: "spent-a04ce",
  storageBucket: "spent-a04ce.appspot.com",
  messagingSenderId: "1080619119292",
  appId: "1:1080619119292:web:1d0a541e8ae888f89a56b9"
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };