import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import sidebarLogo from "../../assets/react.svg";
import logo from "../../assets/logo.webp";
const Sidebar = ({ isOpen, onToggleSidebar, onLogout }) => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Inicio", icon: Home },
    { path: "/performance", label: "Movimiento", icon: TrendingUp },
    { path: "/temperature", label: "Temperatura", icon: Thermometer },
    { path: "/humidity", label: "Humedad", icon: Droplets },
    { path: "/settings", label: "Configuración", icon: Settings },
  ];

  // Detecta si es pantalla móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 750);
    handleResize(); // Inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    if (isMobile) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Botón móvil flotante con logo */}
      {isMobile && (
        <button className="mobile-toggle" onClick={toggleMobileSidebar}>
          <img src={logo} alt="Logo" />
        </button>
      )}

      <div
        className={`sidebar ${
          isMobile ? (isMobileOpen ? "open" : "collapsed") : isOpen ? "" : "collapsed"
        }`}
      >
        <div className="sidebar-header">
          <button className="logo-btn" onClick={isMobile ? toggleMobileSidebar : onToggleSidebar}>
            <div className="logo">
              <div className="logo-icon">
                <img src={logo} alt="Logo" className="logo-img"/>
              </div>
              {(isOpen || isMobileOpen) && <span className="logo-text">NeoDev</span>}
            </div>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                title={!isOpen && !isMobileOpen ? item.label : ""}
                onClick={closeMobileSidebar}
              >
                <Icon size={20} />
                {(isOpen || isMobileOpen) && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-logout">
          <button
            className="logout-btn-sidebar nav-item"
            onClick={() => {
              closeMobileSidebar();
              onLogout();
            }}
            title={!isOpen && !isMobileOpen ? "Cerrar Sesión" : ""}
          >
            <LogOut size={20} />
            {(isOpen || isMobileOpen) && <span>Cerrar Sesión</span>}
          </button>
        </div>

        {(isOpen || isMobileOpen) && user && (
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">{user.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
