
import './index.css';
import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
    
);

