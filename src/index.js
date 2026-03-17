import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppModule from './App.jsx';
import reportWebVitals from './reportWebVitals';


const App = typeof AppModule === 'function' ? AppModule : (AppModule?.default ?? AppModule);


console.log('[index.js] AppModule:', AppModule);
console.log('[index.js] AppModule keys:', Object.keys(AppModule || {}));

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('[index.js] About to render App...');
root.render(<App />);
console.log('[index.js] root.render() called');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
