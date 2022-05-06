import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './context/AuthContext'
import { LoadContextProvider } from './context/LoadContext'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <AuthContextProvider>
    <LoadContextProvider>
        <App />
    </LoadContextProvider>
    </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

