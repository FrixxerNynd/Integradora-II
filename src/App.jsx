import React, { useState, useEffect } from "react";
import Sidebar from "./components/Layout/Sidebar";
import TopBar from "./components/Layout/TopBar";
import Dashboard from "./components/Dashboard/Dashboard";
import SettingsPage from "./components/Dashboard/Settings";
import TemperaturePage from "./components/Dashboard/TemperaturePage";
import HumidityPage from "./components/Dashboard/HumidityPage";
import PerformancePage from "./components/Dashboard/PerformancePage";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./styles/global.css";
import "./App.css";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setActiveItem("dashboard");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className={`app ${isDarkMode ? "dark" : ""}`}>
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <div className="app-main">
          <TopBar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleSidebar}
            onSettingsClick={() => setActiveItem("settings")}
          />

          <main className="app-content">
            {activeItem === "dashboard" && (
              <Dashboard setActiveItem={setActiveItem} />
            )}
            {activeItem === "performance" && <PerformancePage />}
            {activeItem === "temperature" && <TemperaturePage />}
            {activeItem === "humidity" && <HumidityPage />}
            {activeItem === "settings" && <SettingsPage />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;
