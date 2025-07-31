import React, { useState, useEffect } from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../Service/mockData";
import "./SensorPage.css";
import { getData, filterData } from "../../Service/DashboardService";

const HumidityPage = () => {
  const [loading, setLoading] = useState(true);
  const [humidityData, setHumidityData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [minHumidity, setMinHumidity] = useState(null);
  const [maxHumidity, setMaxHumidity] = useState(null);
  const [humidityVariation, setHumidityVariation] = useState(null);
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

  const humidityStats = [
    { label: "Mínima", value: minHumidity+"%" },
    { label: "Máxima", value: maxHumidity+"%" },
    { label: "Variación", value: humidityVariation+"%" },
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Humedad:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters, dataToFilter = rawData) => {
    const { filteredData, formattedData, latestRecord } = filterData(filters, dataToFilter, "humedad");
    setHumidityData(formattedData);
    if (latestRecord) {
      setLatestRecord(latestRecord);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const rawData = await getData();
        const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setRawData(sortedData);
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

        const lastN = latestRecord;
        const recentData = sortedData.slice(-lastN);
  
        const humidyties = recentData.map((r) => r.humedad);
        const min = Math.min(...humidyties);
        const max = Math.max(...humidyties);
        const variation = max - min;
  
        setMinHumidity(min);
        setMaxHumidity(max);
        setHumidityVariation(variation);

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
    </div>
  );
};

export default HumidityPage;
