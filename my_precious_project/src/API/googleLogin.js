import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7_WIFJ2n7A2VWXPkSvCz10X-s8TUcRjk",
  authDomain: "precious-relationship.firebaseapp.com",
  projectId: "precious-relationship",
  storageBucket: "precious-relationship.appspot.com",
  messagingSenderId: "942898473483",
  appId: "1:942898473483:web:23e2d775004447bdbd350e",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
export { app, auth };
