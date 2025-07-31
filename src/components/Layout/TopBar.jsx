import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Settings,
  Moon,
  Sun,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./TopBar.css";
import {useAuth} from "../Auth/AuthContext";

const TopBar = ({ isDarkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const { user } = useAuth();

  // Datos de notificaciones mock
  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Temperatura Alta",
      message: "La temperatura ha superado los 28°C",
      time: "Hace 5 min",
      icon: AlertCircle,
      color: "#f59e0b",
    },
    {
      id: 2,
      type: "success",
      title: "Sistema Actualizado",
      message: "El dashboard se ha actualizado correctamente",
      time: "Hace 1 hora",
      icon: CheckCircle,
      color: "#10b981",
    },
    {
      id: 3,
      type: "info",
      title: "Mantenimiento Programado",
      message: "Mantenimiento del servidor programado para mañana",
      time: "Hace 3 horas",
      icon: Clock,
      color: "#3b82f6",
    },
  ];

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">Panel de Control</h1>
        <span className="page-subtitle">
          Bienvenido de vuelta, esto es lo que está pasando
        </span>
      </div>

      <div className="topbar-right">
        <div className="topbar-actions">
          <button
            className="action-btn"
            onClick={toggleDarkMode}
            title={
              isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="user-menu">
          <div className="user-info-header">
            <div className="user-info-content">
              <span className="user-name">{user.name}</span>
            </div>
          </div>
          <div className="user-avatar">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="User"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
