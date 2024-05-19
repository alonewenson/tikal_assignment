import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LeastPopular from './LeastPopular';
import BarChart from './BarChart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LeastPopular />
    <BarChart />
  </React.StrictMode>
);
