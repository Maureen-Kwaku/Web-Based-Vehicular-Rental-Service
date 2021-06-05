import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD4OxV_WiVQGhwE2xiWxXoIxEAFtfoeys0",
  authDomain: "rent-a-ride-27659.firebaseapp.com",
  projectId: "rent-a-ride-27659",
  storageBucket: "rent-a-ride-27659.appspot.com",
  messagingSenderId: "374248893711",
  appId: "1:374248893711:web:7f7dee62ecdd38806d227a",
  measurementId: "G-3K5EB7DC2L",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
