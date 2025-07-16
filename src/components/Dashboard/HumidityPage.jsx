import React, { useState, useEffect } from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../data/mockData";
import "./SensorPage.css";
import { getData } from "../../data/DashboardService";

const HumidityPage = () => {
  const [loading, setLoading] = useState(true);
  const [humidityData, setHumidityData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [error, setError] = useState(null);
  /**
   const humidityData = {
     id: 2,
     title: "Humedad",
     value: "65%",
     icon: "droplets",
     trend: "-1.2%",
     isPositive: false,
     color: "green",
   };
   * 
   */

  const humidityHistory = [
    { time: "Hace 6h", value: 68 },
    { time: "Hace 5h", value: 70 },
    { time: "Hace 4h", value: 65 },
    { time: "Hace 3h", value: 62 },
    { time: "Hace 2h", value: 64 },
    { time: "Hace 1h", value: 66 },
    { time: "Ahora", value: 65 },
  ];

  const humidityStats = [
    { label: "Mínima", value: "45%", time: "3:00 PM" },
    { label: "Máxima", value: "78%", time: "6:00 AM" },
    { label: "Promedio", value: "62%", time: "24 horas" },
    { label: "Variación", value: "±5%", time: "Semana" },
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Humedad:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters) => {
    console.log("Filtros de humedad aplicados:", filters);
    // Aquí puedes implementar la lógica para filtrar los datos
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const rawData = await getData();
        const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        if (sortedData.length > 0) {
          setLatestRecord(sortedData[sortedData.length - 1]);
        }
        const formattedData = sortedData.map((record) => {
          const displayDateTime = new Date(record.fecha).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            time: displayDateTime,
            value: record.humedad,
          };
        });

        setHumidityData(formattedData);
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
      <div className="humidity-header">
        <div className="humidity-title-section">
          <h1>Monitoreo de Humedad</h1>
        </div>

        <div className="humidity-current-reading">
          <SensorToggle
            title="Control del Sensor de Humedad"
            initialState={true}
            onToggle={handleSensorToggle}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="humidity-main-grid">
        <div className="humidity-stats-section">
          <div className="sensor-stats">
            <h3>Estadísticas de Humedad</h3>
            <div className="stats-grid">
              {humidityStats.map((stat, index) => (
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
        <div className="humidity-chart-section">
        {loading && <p>Cargando gráfica...</p>}
        {error && <p className="error-message">Error al cargar gráfica: {error}</p>}
        {humidityData && (
          <LineChart
            data={humidityData}
            title="Grafica de Humedad"
            color="#3b82f6"
            height={400}
          />
        )}
        </div>
      </div>

      <div className="humidity-alerts-section">
        <div className="sensor-alerts">
          <h3>Alertas de Humedad</h3>
          <div className="alert-settings">
            <div className="alert-item">
              <label>Humedad Máxima Permitida</label>
              <input type="number" defaultValue="80" />
              <span>%</span>
            </div>
            <div className="alert-item">
              <label>Humedad Mínima Permitida</label>
              <input type="number" defaultValue="30" />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumidityPage;
