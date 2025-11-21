import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx'; // Your Layout (the file above)
import './index.css';

// Import your page components
import KitchenDashboard from './pages/KitchenDashboard.jsx';
import Pantry from './pages/Pantry.jsx';
import Recipes from './pages/Recipes.jsx';
import MealPlan from './pages/MealPlan.jsx';
import ShoppingList from './pages/ShoppingList.jsx';
import AllergiesPreferences from './pages/AllergiesPreferences.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This tells React to always render your 'App' component as the layout */}
        <Route path="/" element={<App />}>
          {/* When the path is exactly "/", render the KitchenDashboard */}
          <Route index element={<KitchenDashboard />} />
          <Route path="pantry" element={<Pantry />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="planner" element={<MealPlan />} />
          <Route path="shopping" element={<ShoppingList />} />
          <Route path="allergies" element={<AllergiesPreferences />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

