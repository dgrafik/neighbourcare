import * as firebase from "firebase";
// import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestore } from 'geofirestore';

const firebaseConfig = {
    apiKey: "AIzaSyCisjCZGDGELp7AehA98Oq2JCedQJ8c01A",
    authDomain: "covid-df9b0.firebaseapp.com",
    databaseURL: "https://covid-df9b0.firebaseio.com",
    projectId: "covid-df9b0",
    storageBucket: "covid-df9b0.appspot.com",
    messagingSenderId: "363363830496",
    appId: "1:363363830496:web:cb53780141a134cbe09e85",
    measurementId: "G-EMEY9V1XD8"
  };
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore()
const geofirestore = new GeoFirestore(firestore)
const geocollection = geofirestore.collection('offering')
const firestoreCollVol = firebase.firestore().collection('offering')
const auth = firebase.auth()
// const trainingCollection = db.collection('training')

export default {
    auth,
    firebase,
    firestore,
    geocollection,
    firestoreCollVol
    // trainingCollection
}
