import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './media.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom'
// import 'antd/dist/antd.css';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <HashRouter>
      <App />
    </HashRouter>
);

reportWebVitals();
