import React, { useState } from "react";
import DateFilter from "./DateFilter";
import "./SensorToggle.css";

const SensorToggle = ({
  title,
  initialState = true,
  onToggle,
  onFilterChange,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleFilterChange = (filters) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="sensor-toggle-container">
      <div className="sensor-toggle-header">
        <h3 className="sensor-toggle-title">{title}</h3>
      </div>

      <div className="sensor-toggle-wrapper">
        <div className="sensor-toggle-content">
          <div className="sensor-status">
            <span className={`status-text ${isOn ? "active" : "inactive"}`}>
              {isOn ? "ENCENDIDO" : "APAGADO"}
            </span>
            <span className="status-label">Estado del Sensor</span>
          </div>

          <div className="sensor-filter-section">
            <DateFilter onFilterChange={handleFilterChange} />
          </div>

          <div className="sensor-power-section">
            <div
              className={`power-button ${isOn ? "on" : "off"}`}
              onClick={handleToggle}
            >
              <div className="power-icon">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 2v6m8-6v6m-4-4v10m0 0a6 6 0 0 1-6-6V8a6 6 0 0 1 12 0v4a6 6 0 0 1-6 6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorToggle;
