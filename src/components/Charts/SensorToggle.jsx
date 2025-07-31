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
        </div>
      </div>
    </div>
  );
};

export default SensorToggle;
