import React, { useState } from 'react';
// This path assumes 'dashboard.css' is in the same 'src/pages' folder
import './KitchenDashboard.css'; 

function KitchenDashboard() {
  // State for the pantry tabs
  const [activeTab, setActiveTab] = useState('fridge');

  return (
    // Use React.Fragment (empty tags) because the <main> wrapper
    // is already in your Layout component (Dashboard.jsx)
    <>
      <header className="dashboard-header">
        <h1>Kitchen Dashboard</h1>
        <div className="user-profile">
          <span>Hi, Amanda</span>
          <img 
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D&auto=format&fit=crop&w=80&q=80" 
            alt="User Avatar" 
            className="avatar"
          />
          <span>⚙️</span>
        </div>
      </header>

      <section className="widgets-grid">
        
        {/* Weather Widget */}
        <div className="widget weather-widget">
          <div className="weather-content">
            <h2>Friday, November 21</h2>
            <div className="time">5:23</div>
            <div className="weather-info">
              <span>☀️</span> {/* Weather Icon */}
              <div className="temp">72°</div>
              <div className="location">Atlanta, GA</div>
            </div>
          </div>
        </div>

        {/* Today's Featured Recipe Widget */}
        <div className="widget recipe-widget">
          <header className="widget-header">
            <h2>Todays Featured Recipe</h2>
            <a href="#">More Recipes &gt;</a>
          </header>
          <div className="recipe-body">
            <img 
              src="https://images.unsplash.com/photo-1598511757397-3fe0c2131641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D&auto=format&fit=crop&w=200&q=80" 
              alt="Quick Chicken Piccata" 
              className="recipe-image"
            />
            <div className="recipe-details">
              <h3>Quick Chicken Piccata</h3>
              <div className="recipe-time">
                <span>⏰</span> 25 mins
              </div>
            </div>
            <button className="btn btn-primary">View Recipe</button>
          </div>
        </div>

        {/* Pantry Overview Widget */}
        <div className="widget pantry-widget">
          <h2>Pantry Overview</h2>
          <div className="pantry-tabs">
            <button 
              className={activeTab === 'all' ? 'tab-btn active' : 'tab-btn'} 
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={activeTab === 'pantry' ? 'tab-btn active' : 'tab-btn'} 
              onClick={() => setActiveTab('pantry')}
            >
              Pantry
            </button>
            <button 
              className={activeTab === 'fridge' ? 'tab-btn active' : 'tab-btn'} 
              onClick={() => setActiveTab('fridge')}
            >
              Fridge
            </button>
            <button 
              className={activeTab === 'freezer' ? 'tab-btn active' : 'tab-btn'} 
              onClick={() => setActiveTab('freezer')}
            >
              Freezer
            </button>
          </div>
          <ul className="pantry-list">
            <li className="pantry-item">
              <span>Chicken Breast</span>
              <span>5</span>
              <span className="status-good">Good</span>
            </li>
            <li className="pantry-item">
              <span>Milk</span>
              <span>1</span>
              <span className="status-low">Low</span>
            </li>
            <li className="pantry-item">
              <span>Yogurt</span>
              <span>6</span>
              <span className="status-good">Good</span>
            </li>
            <li className="pantry-item">
              <span>Broccoli</span>
              <span>1 bag</span>
              <span className="status-ok">OK</span>
            </li>
          </ul>
          <a href="#" className="view-all-link">Open full pantry</a>
        </div>

        {/* Tonight's Dinner Widget */}
        <div className="widget recipe-widget">
          <header className="widget-header">
            <h2>Tonights dinner</h2>
          </header>
          <div className="recipe-body">
            <img 
              src="https://images.unsplash.com/photo-1606502973842-b980b1e4ab50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D&auto=format&fit=crop&w=200&q=80" 
              alt="Creamy Lemon Garlic Chicken" 
              className="recipe-image"
            />
            <div className="recipe-details">
              <h3>Creamy Lemon Garlic Chicken</h3>
              <div className="recipe-time">
                <span>⏰</span> 30 mins
              </div>
            </div>
            <button className="btn btn-primary">View Recipe</button>
          </div>
        </div>

      </section>
    </>
  );
}

export default KitchenDashboard;
