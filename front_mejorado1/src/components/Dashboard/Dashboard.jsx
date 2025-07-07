import React from "react";
import SensorCard from "../Cards/SensorCard";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import ActivityFeed from "./ActivityFeed";
import AIChat from "./AIChat";
import { sensorData, chartData, activityData } from "../../data/mockData";
import "./Dashboard.css";

const Dashboard = ({ setActiveItem }) => {
  // Crear cards navegables con miniaturas
  const navigationCards = [
    {
      id: 1,
      title: "Temperatura",
      value: "24.5°C",
      trend: "+2.1%",
      isPositive: true,
      color: "#3b82f6",
      target: "temperature",
      miniChart: "line",
    },
    {
      id: 2,
      title: "Humedad",
      value: "65%",
      trend: "-1.2%",
      isPositive: false,
      color: "#10b981",
      target: "humidity",
      miniChart: "circular",
    },
    {
      id: 3,
      title: "Movimiento",
      value: "92%",
      trend: "+5.3%",
      isPositive: true,
      color: "#f59e0b",
      target: "performance",
      miniChart: "bar",
    },
  ];

  const handleCardClick = (target) => {
    setActiveItem(target);
  };

  return (
    <div className="dashboard">
      {/* Layout principal con gráfica grande y actividad al lado */}
      <div className="dashboard-main-layout">
        {/* Sección izquierda con sensores y gráfica principal */}
        <div className="dashboard-left">
          {/* Navigation Cards Grid - Con miniaturas clickeables */}
          <div className="dashboard-grid dashboard-grid--navigation">
            {navigationCards.map((card) => (
              <div
                key={card.id}
                className="navigation-card"
                onClick={() => handleCardClick(card.target)}
              >
                <div className="navigation-card-content">
                  <div className="navigation-card-info">
                    <h3 className="navigation-card-title">{card.title}</h3>
                    <div className="navigation-card-value">{card.value}</div>
                    <div
                      className={`navigation-card-trend ${
                        card.isPositive ? "positive" : "negative"
                      }`}
                    >
                      {card.trend}
                    </div>
                  </div>

                  <div className="navigation-card-mini-chart">
                    {card.miniChart === "line" && (
                      <div className="mini-line-chart">
                        <svg width="60" height="30" viewBox="0 0 60 30">
                          <polyline
                            fill="none"
                            stroke={card.color}
                            strokeWidth="2"
                            points="0,25 10,20 20,15 30,10 40,12 50,8 60,5"
                          />
                        </svg>
                      </div>
                    )}

                    {card.miniChart === "circular" && (
                      <div className="mini-circular-chart">
                        <svg width="40" height="40" viewBox="0 0 40 40">
                          <circle
                            cx="20"
                            cy="20"
                            r="15"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                            fill="none"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r="15"
                            stroke={card.color}
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={`${65 * 0.94} ${100 * 0.94}`}
                            strokeDashoffset="0"
                            transform="rotate(-90 20 20)"
                          />
                        </svg>
                      </div>
                    )}

                    {card.miniChart === "bar" && (
                      <div className="mini-bar-chart">
                        <svg width="50" height="30" viewBox="0 0 50 30">
                          <rect
                            x="2"
                            y="20"
                            width="6"
                            height="8"
                            fill={card.color}
                            opacity="0.7"
                          />
                          <rect
                            x="10"
                            y="15"
                            width="6"
                            height="13"
                            fill={card.color}
                            opacity="0.8"
                          />
                          <rect
                            x="18"
                            y="10"
                            width="6"
                            height="18"
                            fill={card.color}
                          />
                          <rect
                            x="26"
                            y="12"
                            width="6"
                            height="16"
                            fill={card.color}
                            opacity="0.9"
                          />
                          <rect
                            x="34"
                            y="8"
                            width="6"
                            height="20"
                            fill={card.color}
                          />
                          <rect
                            x="42"
                            y="5"
                            width="6"
                            height="23"
                            fill={card.color}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className="navigation-card-overlay">
                  <span>Ver detalles →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica principal sin contenedor extra */}
          <LineChart
            data={chartData.temperature}
            title="Tendencia de Temperatura"
            color="#3b82f6"
            height={400}
          />
        </div>

        {/* Sección derecha reorganizada */}
        <div className="dashboard-right">
          {/* Sensores Activos */}
          <div className="active-sensors-section">
            <h3>
              Sensores Activos: <span className="sensor-count">3</span>
            </h3>
          </div>

          {/* Actividad Reciente expandida */}
          <div className="activity-section-expanded">
            <ActivityFeed
              activities={activityData}
              title="Actividad Reciente"
            />
          </div>

          {/* Fecha con su propio recuadro */}
          <div className="date-section-standalone">
            <span className="current-date">
              {new Date().toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* AI Chat Section - Replace statistics */}
      <div className="dashboard-grid dashboard-grid--ai">
        <div className="chart-section ai-section">
          <AIChat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
