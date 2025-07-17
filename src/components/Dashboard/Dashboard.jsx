import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart"; // Correcto: Solo importa el componente contenedor.
import ActivityFeed from "./ActivityFeed";
import AIChat from "./AIChat";
import { activityData } from "../../Service/mockData"; // Correcto: Solo importa los datos que sí usas.
import "./Dashboard.css";
import { getData } from "../../Service/DashboardService";

const Dashboard = ({ setActiveItem }) => {
  // Configura los estados iniciales
  const [loading, setLoading] = useState(true); // Inicia en `true` para mostrar el estado de carga.
  const [error, setError] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null); // Inicia en `null` para más claridad.
  const [latestRecord, setLatestRecord] = useState(null);

 //Obtiene los ultimos valores de temperatura, humedad y movimiento
  const latestTemperature = latestRecord ? `${latestRecord.temperatura}°C` : "---";
  const latestHumidity = latestRecord ? `${latestRecord.humedad}%` : "---";
  const latestMovement = latestRecord ? (latestRecord.movimiento ? 'Detectado' : 'Sin movimiento') : "---";

    useEffect(() => {
      window.scrollTo(0, 0);
    })
    
  const navigationCards = [
    {
      id: 1,
      title: "Temperatura",
      value: latestTemperature, // Usa el valor calculado de la última lectura.
      trend: "Ultima temperatura registrada",
      isPositive: true,
      color: "#3b82f6",
      target: "temperature",
      miniChart: "line",
    },
    { id: 2, title: "Humedad", value: latestHumidity,
      trend: "Ultima humedad registrada",
      isPositive: true,
      color: "#3b82f6",
      target: "humidity",
      miniChart: "line",
    },
    { id: 3, title: "Movimiento", value: latestMovement,
      trend: "Ultima actividad registrada",
      isPositive: true,
      color: "#3b82f6",
      target: "movement",
      miniChart: "line",
    },
  ];

  const handleCardClick = (target) => {
    setActiveItem(target);
  };

  //Carga los datos
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const rawData = await getData();
      const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      
      if (sortedData.length > 0) {
        setLatestRecord(sortedData[sortedData.length - 1]);
      }

      // Agrupa los datos por día en un objeto.
      const dailyData = sortedData.reduce((acc, record) => {
        const day = new Date(record.fecha).toISOString().split('T')[0]; // Obtiene la fecha como "YYYY-MM-DD"
        
        if (!acc[day]) {
          acc[day] = { totalTemp: 0, count: 0 };
        }
        
        acc[day].totalTemp += record.temperatura;
        acc[day].count += 1;
        
        return acc;
      }, {});

      // Convierte el objeto agrupado al formato que necesita la gráfica.
      const formattedData = Object.keys(dailyData).map(day => {
        const averageTemp = dailyData[day].totalTemp / dailyData[day].count;
        const displayDate = new Date(day).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit'
        }); // Formato "dd/mm"

        return {
          time: displayDate, // La etiqueta para el eje X ahora es el día
          value: parseFloat(averageTemp.toFixed(1)) // El valor es el promedio, redondeado
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
    <div className="dashboard">
      <div className="dashboard-main-layout">
        <div className="dashboard-left">
          <div className="dashboard-grid dashboard-grid--navigation">
            {navigationCards.map((card) => (
              <div key={card.id} className="navigation-card" onClick={() => handleCardClick(card.target)}>
                <div className="navigation-card-content">
                  <div className="navigation-card-info">
                    <h3 className="navigation-card-title">{card.title}</h3>
                    <div className="navigation-card-value">{card.value}</div>
                    <div className={`navigation-card-trend ${card.isPositive ? "positive" : "negative"}`}>{card.trend}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="main-chart-container">
            {loading && <div>Cargando datos... ⏳</div>}
            {error && <div className="error-message">Error: {error} 😟</div>}
            {temperatureData && <LineChart data={temperatureData} />}
          </div>
        </div>

        <div className="dashboard-right">
          <div className="activity-section-expanded">
            <ActivityFeed activities={activityData} title="Actividad Reciente" />
          </div>
        </div>
      </div>
      <div className="dashboard-grid dashboard-grid--ai">
        <AIChat />
      </div>
    </div>
  );
};

export default Dashboard;