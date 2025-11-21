import React, { useState } from 'react';
import './KitchenDashboard.css'; 

function KitchenDashboard() {
  // State for the pantry tabs
  const [activeTab, setActiveTab] = useState('fridge');

  return (
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
          {/* Added Settings Icon */}
          <img src="/Settings.png" alt="Settings" className="settings-icon" />
        </div>
      </header>

      <section className="widgets-grid">
        
        {/* Weather Widget */}
        <div className="widget weather-widget">
          <div className="weather-content">
            <h2>Friday, November 21</h2>
            <div className="time">5:23</div>
            <div className="weather-info">
            <img src="/weathericon.png" alt="Settings" className="weather-icon" />
              <div className="temp">72°</div>
              <div className='Location'>
              <h3>Atlanta, GA</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Featured Recipe Widget */}
        <div className="widget recipe-widget">
          <header className="widget-header">
            <h2>Todays Featured Recipe</h2>
            <a href="#">More Recipes &gt;</a>
          </header>
          
          <div className="recipe-content">
            <div className="recipe-main">
                <img 
                src="chickenpiccata.png" 
                alt="Quick Chicken Piccata" 
                className="recipe-image"
                />
                <div className="recipe-info">
                    <h3>Quick Chicken Piccata</h3>
                </div>
            </div>
            
            {/* Footer row with Time (Left) and Button (Right) */}
            <div className="recipe-footer">
                <div className="recipe-time">
                    <img src="/Clock.png" alt="Time" className="time-icon" /> 
                    <span>25 mins</span>
                </div>
                <button className="btn btn-primary">View Recipe</button>
            </div>
          </div>
        </div>

        {/* Pantry Overview Widget */}
        <div className="widget pantry-widget">
          <header className="widget-header">
             <h2>Pantry Overview</h2>
          </header>
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
            <h2>Tonights Dinner</h2>
          </header>
          
          <div className="recipe-content">
            <div className="recipe-main">
                <img 
                src="lemonchicken.png" 
                alt="Quick Chicken Piccata" 
                className="todays-recipe-image"
                />
                <div className="recipe-info">
                    <h3>Creamy Lemon Garlic Chicken</h3>
                </div>
            </div>
            
            {/* Footer row with Time (Left) and Button (Right) */}
            <div className="recipe-footer">
                <div className="recipe-time">
                    <img src="/Clock.png" alt="Time" className="time-icon" /> 
                    <span>25 mins</span>
                </div>
                <button className="btn btn-primary">View Recipe</button>
            </div>
          </div>
        </div>


      </section>
    </>
  );
}

export default KitchenDashboard;