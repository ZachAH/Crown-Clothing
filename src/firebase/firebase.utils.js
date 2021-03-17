import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAqvr4mNPTgAFZEo7CRYGIZXYH8Vwu2uAw",
    authDomain: "crwn-db-b2375.firebaseapp.com",
    projectId: "crwn-db-b2375",
    storageBucket: "crwn-db-b2375.appspot.com",
    messagingSenderId: "504684808282",
    appId: "1:504684808282:web:e04d44c085e007fa03f063",
    measurementId: "G-7S0K3061HW"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;