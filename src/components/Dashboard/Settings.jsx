import React, { useState } from "react";
import { User, Shield, Upload, Eye, EyeOff } from "lucide-react";
import "./Settings.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (field, value) => {
    const newPasswords = { ...passwords, [field]: value };
    setPasswords(newPasswords);

    // Validar que las contraseñas coincidan si ambas están llenas
    if (field === "confirm" || field === "new") {
      if (newPasswords.new && newPasswords.confirm) {
        if (newPasswords.new !== newPasswords.confirm) {
          setPasswordError("Las contraseñas no coinciden");
        } else {
          setPasswordError("");
        }
      } else {
        setPasswordError("");
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Shield },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Configuración</h1>
        <p>Administra las configuraciones de tu dashboard</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-main">
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2>Perfil de Usuario</h2>
              <div className="settings-card">
                <div className="profile-image-section">
                  <div className="current-image">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
                      alt="Foto de perfil"
                      className="profile-image"
                    />
                  </div>
                  <div className="image-actions">
                    <button className="btn-upload">
                      <Upload size={16} />
                      Subir nueva imagen
                    </button>
                  </div>
                </div>

                <div className="setting-item">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="Alejandro Villarreal"
                  />
                </div>
                <div className="setting-item">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="alejandro@neodev.com"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Configuración de Seguridad</h2>
              <div className="settings-card">
                <div className="setting-item">
                  <label htmlFor="currentPassword">Contraseña actual</label>
                  <div className="password-input-container">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={passwords.current}
                      onChange={(e) =>
                        handlePasswordChange("current", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label htmlFor="newPassword">Nueva contraseña</label>
                  <div className="password-input-container">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={passwords.new}
                      onChange={(e) =>
                        handlePasswordChange("new", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label htmlFor="confirmPassword">
                    Confirmar nueva contraseña
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={passwords.confirm}
                      onChange={(e) =>
                        handlePasswordChange("confirm", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>
                {passwordError && (
                  <div className="password-error">{passwordError}</div>
                )}
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="btn-primary">Guardar Cambios</button>
            <button className="btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
