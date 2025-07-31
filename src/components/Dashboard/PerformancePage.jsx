import React, { useEffect, useState } from "react";
import SensorToggle from "../Charts/SensorToggle";
// import LineChart from "../Charts/LineChart"; // ya no lo usaremos aquí
import CustomPieChart from "../Charts/PieChart";
import "./SensorPage.css";
import { getData, filterData } from "../../Service/DashboardService";

const PerformancePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movementData, setMovementData] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [activaciones, setActivaciones] = useState(null);
  const [noActivaciones, setNoActivaciones] = useState(null); // nuevo
  const [pieData, setPieData] = useState([]); // nuevo

  const movementStats = [
    { label: "Detecciones", value: activaciones },
    { label: "Zona activa", value: "Sala", time: "Principal" },
    { label: "Última actividad", value: latestRecord?.fecha ? new Date(latestRecord.fecha).toLocaleDateString("es-MX", 
      { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "Sin actividad"},
  ];


  const handleFilterChange = (filters, dataToFilter = rawData) => {
    const { filteredData, formattedData, latestRecord } = filterData(
      filters,
      dataToFilter,
      "movimiento"
    );
    setMovementData(formattedData);
    if (latestRecord) {
      setLatestRecord(latestRecord);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await getData();
        const sortedData = rawData.sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );
        setRawData(sortedData);

        if (sortedData.length > 0) {
          setLatestRecord(sortedData[sortedData.length - 1]);
        }

        const activados = sortedData.filter((r) => r.movimiento === true).length;
        const noDetectados = sortedData.filter((r) => r.movimiento === false).length;

        setActivaciones(activados);
        setNoActivaciones(noDetectados);

        // Construir data para PieChart
        setPieData([
          {
            name: "Movimiento Detectado",
            value: activados,
            color: "#f59e0b", // naranja
          },
          {
            name: "Sin Movimiento",
            value: noDetectados,
            color: "#cbd5e1", // gris claro
          },
        ]);

        // También se conserva el formateo de datos por si se usa en otros lugares
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

        <div className="performance-current-reading">
          <SensorToggle
            title="Control del Sensor de Movimiento"
            initialState={true}
            onToggle={() => {}}
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

        {/* Pie Chart Section */}
        <div className="performance-chart-section">
          {loading && <div>Cargando datos...</div>}
          {error && <div className="error-message">Error: {error}</div>}
          {!loading && !error && pieData && pieData.length > 0 && (
            <CustomPieChart
              data={pieData}
              title="Distribución de Movimiento"
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
