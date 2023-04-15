import { auth, db } from "@/firebase";
import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

export default function App({ Component, pageProps }) {
  // console.log("App", typeof App);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
          displayPict: user.photoURL,
        },
        { merge: true }
      );
    }
    if (typeof window === "undefined") {
      return <></>;
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    console.log(`no user`);
    return <Login />;
  } else {
    // console.log("ada user", user);
  }

  return <Component {...pageProps} />;
}
