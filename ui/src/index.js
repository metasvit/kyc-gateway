import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MetaMaskProvider} from "metamask-react";

ReactGA.initialize('UA-241029534-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();