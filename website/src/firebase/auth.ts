import firebase from "firebase";
import store from "../store";
import { loginUser, logoutUser } from "../store/auth";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(
      loginUser({
        email: user.email as string,
        name: user.displayName ? user.displayName : undefined,
        uid: user.uid,
      })
    );
  }

  if (!user) {
    store.dispatch(logoutUser());
  }
});
