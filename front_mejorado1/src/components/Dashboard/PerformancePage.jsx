import React from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../data/mockData";
import "./SensorPage.css";

const PerformancePage = () => {
  const movementData = {
    id: 3,
    title: "Movimiento",
    value: "Active",
    icon: "movement",
    trend: "+12 eventos",
    isPositive: true,
    color: "orange",
  };

  const movementHistory = [
    { time: "Hace 6h", value: 3 },
    { time: "Hace 5h", value: 7 },
    { time: "Hace 4h", value: 12 },
    { time: "Hace 3h", value: 8 },
    { time: "Hace 2h", value: 15 },
    { time: "Hace 1h", value: 18 },
    { time: "Ahora", value: 21 },
  ];

  const movementStats = [
    { label: "Detecciones", value: "127", time: "Hoy" },
    { label: "Última actividad", value: "2 min", time: "Hace" },
    { label: "Zona activa", value: "Sala", time: "Principal" },
    { label: "Sensibilidad", value: "Media", time: "Configurado" },
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Movimiento:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters) => {
    console.log("Filtros de movimiento aplicados:", filters);
    // Aquí puedes implementar la lógica para filtrar los datos
  };

  return (
    <div className="sensor-page">
      <div className="performance-header">
        <div className="performance-title-section">
          <h1>Monitoreo de Movimiento</h1>
        </div>

        <div className="performance-current-reading">
          <SensorToggle
            title="Control del Sensor de Movimiento"
            initialState={true}
            onToggle={handleSensorToggle}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="performance-main-grid">
        <div className="performance-stats-section">
          <div className="sensor-stats">
            <h3>Estadísticas de Movimiento</h3>
            <div className="stats-grid">
              {movementStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-time">{stat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="performance-chart-section">
          <LineChart
            data={movementHistory}
            title="Detecciones de Movimiento (Últimas 6 horas)"
            color="#f59e0b"
            height={400}
          />
        </div>
      </div>

      <div className="performance-alerts-section">
        <div className="sensor-alerts">
          <h3>Configuración de Detección</h3>
          <div className="alert-settings">
            <div className="alert-item">
              <label>Sensibilidad del Sensor</label>
              <input type="range" min="1" max="10" defaultValue="5" />
              <span>Media</span>
            </div>
            <div className="alert-item">
              <label>Tiempo de Activación</label>
              <input type="number" defaultValue="3" />
              <span>segundos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
