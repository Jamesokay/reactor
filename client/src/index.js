import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './context/AuthContext'
import {PostContextProvider} from './context/PostContext'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <AuthContextProvider>
    <PostContextProvider>
        <App />
    </PostContextProvider>
    </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

