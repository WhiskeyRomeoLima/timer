import React from 'react';
import ReactDOM from 'react-dom/client';
import Timer from './Timer';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
);