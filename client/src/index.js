import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './flags.css';
import {Provider} from "react-redux"
import {store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import {  persistor } from './redux/store'; // Make sure your store is configured correctly

import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <PrimeReactProvider>
    <BrowserRouter>
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>

      <App />
      </PersistGate>

</Provider>
      </BrowserRouter>
    </PrimeReactProvider>

   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
