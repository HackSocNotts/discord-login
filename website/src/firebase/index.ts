import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

if (isDev) {
  auth.useEmulator("http://localhost:9099/");
  db.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

export { auth, db, functions };