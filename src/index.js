import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateContextProvider } from './components/StateContext/StateContext';
import { BrowserRouter as Router,} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <StateContextProvider>
    <App />
    </StateContextProvider>
  </Router>
);

reportWebVitals();
