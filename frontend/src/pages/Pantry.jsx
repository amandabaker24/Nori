import React, { useState, useRef } from "react";
// Import the same CSS file so we reuse variables and layout styles
import "./Pantry.css";
import { uploadReceipt } from "../api/receipts";

function Pantry() {
  // State for the active tab in the pantry list
  const [activeTab, setActiveTab] = useState("Pantry");
  // State for OCR result + uploading status
  const [ocrResult, setOcrResult] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Scan Receipt button click
  const handleScanClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset file input
      fileInputRef.current.click();
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setOcrResult("");

    try {
      const result = await uploadReceipt(file);
      // If your Django view returns { text: "..." }
      if (result && typeof result.text === "string") {
        setOcrResult(result.text);
      } else {
        // Fallback: show JSON if structure is different
        setOcrResult(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      console.error(err);
      setOcrResult("Error processing receipt.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <header className="pantry-header">
        <h1>Pantry Overview</h1>
        <div className="header-actions">
          {/* These are the orange buttons from your design */}
          <button className="btn-scan" onClick={handleScanClick}>
            Scan Receipt
          </button>
          <button className="btn-add">+ Add Item</button>
          <input
            type="file"
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="user-profile">
            {/* Reusing the profile from the dashboard header for consistency,
                or you can remove if the design is different
            */}
            <img src="profilepic.jpg" alt="User Avatar" className="avatar" />
            <img src="Settings.png" alt="Settings" className="settings-icon" />
          </div>
        </div>
      </header>

      <div className="pantry-grid">
        {/* LEFT COLUMN: The Main Pantry List */}
        <div className="pantry-main-card">
          {/* Tabs */}
          <div className="pantry-tabs">
            <button
              className={activeTab === "All" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            <button
              className={activeTab === "Pantry" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("Pantry")}
            >
              Pantry
            </button>
            <button
              className={activeTab === "Fridge" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("Fridge")}
            >
              Fridge
            </button>
            <button
              className={activeTab === "Freezer" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("Freezer")}
            >
              Freezer
            </button>
          </div>

          {/* Table Header */}
          <div className="pantry-table-header">
            <span className="col-item">Item</span>
            <span className="col-qty">Qty</span>
            <span className="col-status">Status</span>
          </div>

          {/* Table Items */}
          <ul className="pantry-list-items">
            <li className="pantry-row">
              <span className="col-item">Spaghetti</span>
              <span className="col-qty">1</span>
              <span className="col-status status-good">Good</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Tomato Sauce</span>
              <span className="col-qty">3</span>
              <span className="col-status status-good">Good</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Canned Green beans</span>
              <span className="col-qty">2</span>
              <span className="col-status status-good">Good</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Flour</span>
              <span className="col-qty">1</span>
              <span className="col-status status-good">Good</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Cream of Mushroom</span>
              <span className="col-qty">2</span>
              <span className="col-status status-good">Good</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Bread</span>
              <span className="col-qty">1</span>
              <span className="col-status status-ok">OK</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Idaho Potatoes</span>
              <span className="col-qty">0</span>
              <span className="col-status status-out">Out</span>
            </li>
            <li className="pantry-row">
              <span className="col-item">Chocolate Muffins</span>
              <span className="col-qty">2</span>
              <span className="col-status status-expired">Expired</span>
            </li>
          </ul>

          {/* OCR Result Display */}
          {uploading && (
            <div style={{ marginTop: "1rem", color: "#ff9800" }}>
              Uploading and processing receipt...
            </div>
          )}
          {ocrResult && (
            <div
              style={{
                marginTop: "1rem",
                background: "#fffbe6",
                padding: "1rem",
                borderRadius: "8px",
                color: "#333",
              }}
            >
              <strong>Receipt OCR Result:</strong>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  marginTop: "0.5rem",
                }}
              >
                {ocrResult}
              </pre>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Side Widgets */}
        <div className="pantry-side-column">
          {/* Expiring Soon */}
          <div className="widget side-widget">
            <div className="widget-header">
              <h3>Expiring soon</h3>
            </div>
            <span className="subtitle-red">3 items</span>
            <ul className="simple-list">
              <li>
                <span>Milk</span>
                <span>1 day</span>
              </li>
              <li>
                <span>Eggs</span>
                <span>3 days</span>
              </li>
              <li>
                <span>Spinach</span>
                <span>3 days</span>
              </li>
            </ul>
            <button className="btn-link">View All</button>
          </div>

          {/* Out of Stock */}
          <div className="widget side-widget">
            <div className="widget-header">
              <h3>Out of stock</h3>
              <img
                src="/Shoppingcart.png"
                alt="Cart"
                className="widget-icon-green"
              />
            </div>
            <span className="subtitle-red">2 items</span>
            <ul className="simple-list">
              <li>
                <span>Idaho Potatoes</span>
                <button className="btn-add-small">+</button>
              </li>
              <li>
                <span>Chicken Breast</span>
                <button className="btn-add-small">+</button>
              </li>
            </ul>
            <button className="btn-link">View All</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pantry;
