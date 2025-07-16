import React, { useEffect, useState } from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../data/mockData";
import "./SensorPage.css";
import { getData } from "../../data/DashboardService";

const PerformancePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movementData, setMovementData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);

  /**
   const movementData = {
     id: 3,
     title: "Movimiento",
     value: "Active",
     icon: "movement",
     trend: "+12 eventos",
     isPositive: true,
     color: "orange",
   };
   * 
   */

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
    { label: "Zona activa", value: "Sala", time: "Principal" },
    { label: "Última actividad", value: latestRecord?.fecha }
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Movimiento:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters) => {
    console.log("Filtros de movimiento aplicados:", filters);
    // Aquí puedes implementar la lógica para filtrar los datos
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await getData();
        const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        if (sortedData.length > 0) {
          setLatestRecord(sortedData[sortedData.length - 1]);
        } 
        const formattedData = sortedData.map((record) => {
          const displayDateTIme = new Date(record.fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            time: displayDateTIme,
            value: Number(record.movimiento),
          };
        });
        setMovementData(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [])

  return (
    <div className="sensor-page">
      <div className="performance-header">
        <div className="performance-title-section">
          <h1>Monitoreo de Movimiento</h1>
        </div>

        {/* Toggle Section */}
        <div className="performance-current-reading">
          <SensorToggle
            title="Control del Sensor de Movimiento"
            initialState={true}
            onToggle={handleSensorToggle}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

        {/* Stats Section */}
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


        {/* Chart Section */}
        <div className="performance-chart-section">
        {loading && <div>Cargando datos... </div>}
        {error && <div className="error-message">Error: {error} </div>}
          {movementData && (
          <LineChart
            data={movementData}
            title="Detecciones de Movimiento (Últimas 6 horas)"
            color="#f59e0b"
            height={400}
          />
          )}
        </div>
      </div>

      {/* Configuration Section */}
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
