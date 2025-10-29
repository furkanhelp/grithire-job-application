import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import { ToastProvider } from './hooks/useToast.jsx';
// import {ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <ToastProvider>

    <App />
  </ToastProvider>
    {/* <ToastContainer position='top-center'/> */}
  </>
)
