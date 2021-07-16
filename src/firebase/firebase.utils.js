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

export const addCollectionAndDocuments = async (collectionKey , objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedColection = collections.docs.map(doc => {
        const {title,items} = doc.data();
        
        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });
    return transformedColection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator;
    },{});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;