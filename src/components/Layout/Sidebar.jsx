import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // 1. Importa NavLink
import {
  Home,
  Settings,
  TrendingUp,
  Thermometer,
  Droplets,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";
import { useAuth } from "../Auth/AuthContext";


// 2. Elimina las props 'activeItem' y 'setActiveItem'
const Sidebar = ({ isOpen,onToggleSidebar, onLogout }) => {
  const { user } = useAuth();
  // El estado 'isCollapsed' se puede mantener o eliminar si 'isOpen' lo controla todo
  // Para este ejemplo, asumimos que 'isOpen' viene del padre y controla el colapso.

  // 3. Actualiza 'id' por 'path' para que coincida con tus rutas
  const menuItems = [
    { path: "/dashboard", label: "Inicio", icon: Home },
    { path: "/performance", label: "Movimiento", icon: TrendingUp },
    { path: "/temperature", label: "Temperatura", icon: Thermometer },
    { path: "/humidity", label: "Humedad", icon: Droplets },
    { path: "/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-header">
            <button className="logo-btn" onClick={onToggleSidebar}>
              <div className="logo">
                <div className="logo-icon">🚀</div>
                {isOpen && <span className="logo-text">NeoDev</span>}
              </div>
            </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            // 4. Reemplaza <button> con <NavLink>
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => // NavLink te da 'isActive' para el estilo
                `nav-item ${isActive ? "active" : ""}`
              }
              title={!isOpen ? item.label : ""}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-logout">
        <button
          className="logout-btn-sidebar nav-item"
          onClick={onLogout}
          title={!isOpen ? "Cerrar Sesión" : ""}
        >
          <LogOut size={20} />
          {isOpen && <span>Cerrar Sesión</span>}
        </button>
      </div>
      
      {/* El footer puede usar el mismo prop 'isOpen' */}
      {isOpen && (
        <div className="sidebar-footer">
          {/* ... tu información de usuario ... */}
          {/* Asegúrate de que 'user' no sea nulo antes de intentar usarlo */}
          {user && (
            <div className="user-info">
                <div className="user-details">
                    {/* ACCEDE A LA PROPIEDAD '.name' */}
                    <span className="user-name">{user.name}</span>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;