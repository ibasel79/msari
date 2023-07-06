import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import CSS here

import "./assets/scss/custom.scss";
document.body.style.zoom = 1.0;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);