import React, { useEffect, useState } from "react";
import SensorToggle from "../Charts/SensorToggle";
import LineChart from "../Charts/LineChart";
import { chartData } from "../../Service/mockData";
import "./SensorPage.css";
import { getData, filterData } from "../../Service/DashboardService";

const TemperaturePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [minTemp, setMinTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [tempVariation, setTempVariation] = useState();
  /**
   const temperatureData = {
     id: 1,
     title: "Temperatura",
     value: "24.5°C",
     icon: "thermometer",
     trend: "+2.1%",
     isPositive: true,
     color: "blue",
   };
   * 
   */

  const temperatureStats = [
    { label: "Mínima", value: minTemp+"°C", time: "24 horas" },
    { label: "Máxima", value: maxTemp+"°C", time: "24 horas" },
    { label: "Promedio", value: "23.4°C", time: "24 horas" },
    { label: "Variación", value: tempVariation+"°C", time: "24 horas" },
  ];

  const handleSensorToggle = (state) => {
    console.log("Sensor de Temperatura:", state ? "ENCENDIDO" : "APAGADO");
  };

  const handleFilterChange = (filters, dataToFilter = rawData) => {
    const {filteredData, formattedData, latestRecord } = filterData(filters, dataToFilter, "temperatura");

    setTemperatureData(formattedData);
    if (latestRecord) {
      setLatestRecord(latestRecord);
    }
  };
  


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const rawData = await getData();
  
        const sortedData = rawData.sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );
  
        setRawData(sortedData);
  
        // Último registro
        if (sortedData.length > 0) {
          setLatestRecord(sortedData[sortedData.length - 1]);
        }
  
        const lastN = latestRecord;
        const recentData = sortedData.slice(-lastN);
  
        const temperatures = recentData.map((r) => r.temperatura);
        const min = Math.min(...temperatures);
        const max = Math.max(...temperatures);
        const variation = max - min;
  
        setMinTemp(min);
        setMaxTemp(max);
        setTempVariation(variation);
  
        // Formatear datos para la gráfica
        const formattedData = recentData.map((record) => {
          const displayDateTime = new Date(record.fecha).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
  
          return {
            time: displayDateTime,
            value: record.temperatura,
          };
        });
  
        setTemperatureData(formattedData);
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
        {loading && <div>Cargando datos... </div>}
        {error && <div className="error-message">Error: {error} </div>}
        {temperatureData && (
          <LineChart
            data={temperatureData}
            title="Tendencia de Temperatura (Últimas 6 horas)"
            color="#3b82f6"
            height={400}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default TemperaturePage;
