import React from "react";
import {
  Home,
  Settings,
  TrendingUp,
  Thermometer,
  Droplets,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ activeItem, setActiveItem, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "performance", label: "Movimiento", icon: TrendingUp },
    { id: "temperature", label: "Temperatura", icon: Thermometer },
    { id: "humidity", label: "Humedad", icon: Droplets },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">🚀</div>
          <span className="logo-text">NeoDev</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-logout">
        <button
          className="logout-btn-sidebar"
          onClick={onLogout}
          title="Cerrar Sesión"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Usuario"
            />
          </div>
          <div className="user-details">
            <span className="user-name">Alejandro Villarreal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
