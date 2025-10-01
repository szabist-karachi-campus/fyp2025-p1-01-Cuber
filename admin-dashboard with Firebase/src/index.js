import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import app from './firebase';
// Log the Firebase app instance to verify connection at entry point
console.log('Firebase app instance:', app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
