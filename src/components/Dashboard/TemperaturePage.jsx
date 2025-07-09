import React from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../data/mockData";
import "./SensorPage.css";

const TemperaturePage = () => {
  const temperatureData = {
    id: 1,
    title: "Temperatura",
    value: "24.5°C",
    icon: "thermometer",
    trend: "+2.1%",
    isPositive: true,
    color: "blue",
  };

  const temperatureHistory = [
    { time: "Hace 6h", value: 22 },
    { time: "Hace 5h", value: 23 },
    { time: "Hace 4h", value: 24 },
    { time: "Hace 3h", value: 26 },
    { time: "Hace 2h", value: 25 },
    { time: "Hace 1h", value: 24 },
    { time: "Ahora", value: 25 },
  ];

  const temperatureStats = [
    { label: "Mínima", value: "18.2°C", time: "6:00 AM" },
    { label: "Máxima", value: "28.7°C", time: "2:30 PM" },
    { label: "Promedio", value: "23.4°C", time: "24 horas" },
    { label: "Variación", value: "±2.1°C", time: "Semana" },
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Temperatura:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters) => {
    console.log("Filtros de temperatura aplicados:", filters);
    // Aquí puedes implementar la lógica para filtrar los datos
  };

  return (
    <div className="sensor-page">
      <div className="temperature-header">
        <div className="temperature-title-section">
          <h1>Monitoreo de Temperatura</h1>
        </div>

        <div className="temperature-current-reading">
          <SensorToggle
            title="Control del Sensor de Temperatura"
            initialState={true}
            onToggle={handleSensorToggle}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="temperature-main-grid">
        <div className="temperature-stats-section">
          <div className="sensor-stats">
            <h3>Estadísticas de Temperatura</h3>
            <div className="stats-grid">
              {temperatureStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-time">{stat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="temperature-chart-section">
          <LineChart
            data={temperatureHistory}
            title="Tendencia de Temperatura (Últimas 6 horas)"
            color="#3b82f6"
            height={400}
          />
        </div>
      </div>

      <div className="temperature-alerts-section">
        <div className="sensor-alerts">
          <h3>Alertas de Temperatura</h3>
          <div className="alert-settings">
            <div className="alert-item">
              <label>Temperatura Máxima Permitida</label>
              <input type="number" defaultValue="30" />
              <span>°C</span>
            </div>
            <div className="alert-item">
              <label>Temperatura Mínima Permitida</label>
              <input type="number" defaultValue="15" />
              <span>°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperaturePage;
