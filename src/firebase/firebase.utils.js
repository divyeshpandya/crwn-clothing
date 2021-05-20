import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCsDDdWhccOy3ePgJMpHjkgU105-FxRrGQ",
    authDomain: "crwn-db-9826b.firebaseapp.com",
    projectId: "crwn-db-9826b",
    storageBucket: "crwn-db-9826b.appspot.com",
    messagingSenderId: "65034627811",
    appId: "1:65034627811:web:d2006a928505fe979273d6",
    measurementId: "G-GFD22D2RQC"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;