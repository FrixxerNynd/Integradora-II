import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/Auth/AuthContext'; // <<< CORRECCIÓN 1: Importa 'useAuth'
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Dashboard from './components/Dashboard/Dashboard';
import SettingsPage from './components/Dashboard/Settings';
import TemperaturePage from './components/Dashboard/TemperaturePage';
import HumidityPage from './components/Dashboard/HumidityPage';
import PerformancePage from './components/Dashboard/PerformancePage';
import Login from './components/Auth/Login';

import './styles/global.css';
import './App.css';

// Componente interno para el layout principal
const MainLayout = () => {
  const { logout } = useAuth(); // <<< CORRECCIÓN 2: Usa el hook 'useAuth'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={logout}
      />
      <div className="app-main">
        <TopBar
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="app-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/temperature" element={<TemperaturePage />} />
            <Route path="/humidity" element={<HumidityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  const { user } = useAuth(); // <<< CORRECCIÓN 2: Usa el hook 'useAuth'
  console.log('%cApp Render: user is', 'color: orange;', user);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;