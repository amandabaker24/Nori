import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx'; // Your Layout (the file above)
import './index.css';

// Import your page components
import KitchenDashboard from './pages/KitchenDashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This tells React to always render your 'App' component as the layout */}
        <Route path="/" element={<App />}>
          {/* When the path is exactly "/", render the KitchenDashboard */}
          <Route index element={<KitchenDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

