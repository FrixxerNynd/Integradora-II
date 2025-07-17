import React, { useEffect, useState } from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import "./SensorPage.css";
import { getData, filterData } from "../../Service/DashboardService";

const PerformancePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movementData, setMovementData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [activaciones, setActivaciones] = useState(null);

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


  const movementStats = [
    { label: "Detecciones", value: activaciones},
    { label: "Zona activa", value: "Sala", time: "Principal" },
    { label: "Última actividad", value: latestRecord?.fecha }
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Movimiento:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters, dataToFilter = rawData) => {
    const { filteredData, formattedData, latestRecord } = filterData(filters, dataToFilter, "movimiento");
    setMovementData(formattedData);
    if (latestRecord) {
      setLatestRecord(latestRecord);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await getData();
  
        // Ordenar por fecha ascendente
        const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setRawData(sortedData);
  
        if (sortedData.length > 0) {
          setLatestRecord(sortedData[sortedData.length - 1]);
        }
        // Contar cuántas veces se activó el sensor
        const activaciones = sortedData.filter(record => record.movimiento === true).length;
        setActivaciones(activaciones);
  
        // Formatear los datos para la gráfica
        const formattedData = sortedData.map((record) => {
          const displayDateTime = new Date(record.fecha).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
  
          return {
            time: displayDateTime,
            value: Number(record.movimiento), // true => 1, false => 0
          };
        });
  
        setMovementData(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);
  
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
            title="Grafica de Movimiento"
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
