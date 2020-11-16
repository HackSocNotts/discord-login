import React from "react";
import ReactDOM from "react-dom";
import "./firebase/config";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { loginWithCustomToken } from "./store/auth";
import "./firebase/auth";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

const queryParams = new URLSearchParams(window.location.search);

// Log User in if just returned from Discord OAuth
if (queryParams.has("token")) {
  const token = queryParams.get("token") as string;
  store.dispatch(loginWithCustomToken(token));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
