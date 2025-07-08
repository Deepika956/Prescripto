import React from 'react'; // Required for JSX syntax
import { createRoot } from 'react-dom/client'; // Ensure this is from 'react-dom/client'
import './index.css'; // Verify the existence of this file
import App from './App.jsx'; // Verify the path and file existence
import { BrowserRouter } from 'react-router-dom'; // Ensure react-router-dom is installed
// import { AppContextProvider } from './context/AppContext';
import { AppContextProvider } from './context/AppContext';




// import {BrowserRouter} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
  <App />
  </AppContextProvider>
  
  </BrowserRouter>,
)
