import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 
import './App.css'; 


function App() {

  return (
    <div className="dashboard-container">
        
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/orangeicon.png" alt="Logo"/>
        </div>
        
        {/* 4. Converted all <li> elements to <NavLink> */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              {/* 'to' prop is the URL. 'className' checks if the link is active. */}
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/houseicon.png" alt="Dashboard" className="nav-icon" /> <span className="nav-label">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/pantry" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/pantryicon.png" alt="Pantry" className="nav-icon" /> <span className="nav-label">Pantry</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/recipes" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/recipeicon.png" alt="Recipes" className="nav-icon" /> <span className="nav-label">Recipes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/shopping" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/grocerycart.png" alt="Shopping List" className="nav-icon" /> <span className="nav-label">Shopping List</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/planner" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/Calendar.png" alt="Meal Planner" className="nav-icon" /> <span className="nav-label">Meal Planner</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/allergies" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/allergyicon.png" alt="Allergies" className="nav-icon" /> <span className="nav-label">Allergies & Preferences</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/nori" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/mic.png" alt="Nori" className="nav-icon" /> <span className="nav-label">Nori</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />

      </main>
    </div>
  );
}

export default App;