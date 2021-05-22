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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;