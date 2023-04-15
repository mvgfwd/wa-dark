import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbl9ObPzXeSE0Q--0L4eUxHR-eYeD6xJU",
  authDomain: "wa-clone-5ccba.firebaseapp.com",
  projectId: "wa-clone-5ccba",
  storageBucket: "wa-clone-5ccba.appspot.com",
  messagingSenderId: "388962228046",
  appId: "1:388962228046:web:b1dcd4d36575659dab301f",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
