import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import { Router } from "react-router-dom";

// import "./index.css";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { MetaMaskProvider } from "metamask-react";

ReactGA.initialize("UA-241029534-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(document.getElementById("root"));
const history = createBrowserHistory();

root.render(
  <Router history={history}>
    <App />
  </Router>
  // <React.StrictMode>
  //   <MetaMaskProvider>
  //     <App />
  //   </MetaMaskProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
