import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from "stores/auth"
import { CommonProvider } from "stores/common"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CommonProvider>
        <Router>
          <App />
        </Router>
      </CommonProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
