import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3nW7UrtypvQXhEGGPF27Bya5ofSiw1R8",
  authDomain: "hn-discord.firebaseapp.com",
  databaseURL: "https://hn-discord.firebaseio.com",
  projectId: "hn-discord",
  storageBucket: "hn-discord.appspot.com",
  messagingSenderId: "957606458471",
  appId: "1:957606458471:web:5a5158c06f2b17e4fe50c2",
};

firebase.initializeApp(firebaseConfig);
