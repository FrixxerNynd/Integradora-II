import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  Upload,
  Eye,
  EyeOff,
  Users as UsersIcon,
  Trash2,
} from "lucide-react";
import "./Settings.css";
import { getUser, deleteUser, registerUser, changePassword, changeUser } from "../../Service/AuthService";
import UserCards from "../Cards/UserCard";
import UserModal from "./Modals/UserModal";
import { useAuth } from "../Auth/AuthContext";
import Swal from 'sweetalert2'

const SettingsPage = () => {
  const user = useAuth();
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
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);


  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = user.token;
        const users = await getUser(token);
  
        const activeUsers = users
          .filter(user => user.status === true) // Filtrar usuarios activos
          .map(({ name, email, rol, status, createdAt }) => ({
            name,
            email,
            rol,
            status,
            createdAt
          }));
  
        setActiveUsers(activeUsers);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleDeleteUser = async (email) => {
    try {
      const token = user.token;
      await deleteUser(token, email);
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handlePasswordChange = (field, value) => {
    const newPasswords = { ...passwords, [field]: value };
    setPasswords(newPasswords);

    if (field === "confirm" || field === "new") {
      if (newPasswords.new && newPasswords.confirm) {
        setPasswordError(
          newPasswords.new !== newPasswords.confirm
            ? "Las contraseñas no coinciden"
            : ""
        );
      } else {
        setPasswordError("");
        const token = user.token;
        const user = {
          email: user.user.email,
          password: passwords.new,
        };
        const response = changePassword(token, user);
        console.log(response);
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al cambiar la contraseña',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
  };

  const handleSaveChanges = () => {
   const token = user.token;
   const userUpdated = {
     name: document.getElementById("name").value,
     email: document.getElementById("email").value,
   };
   if (!userUpdated.name || !userUpdated.email) {
     Swal.fire({
       icon: 'error',
       title: 'Error al actualizar el perfil, campos vacios',
       showConfirmButton: false,
       timer: 1500
     });
     return;
   }
   const response = changeUser(token, userUpdated);
   console.log(response);
   if (response.ok) {
     Swal.fire({
       icon: 'success',
       title: 'Perfil actualizado correctamente',
       showConfirmButton: false,
       timer: 1500
     });
   }
  };

  const handleRegister = async (user) => {
    try {
      const token = user.token;
      await registerUser(token, user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };
  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "users", label: "Usuarios", icon: UsersIcon },
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
            if (tab.id === "users" && user.rol !== "admin") {
              return null;
            }
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
                  <input type="text" id="name" defaultValue={user.user.name} />
                </div>
                <div className="setting-item">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" defaultValue={user.user.email} />
                </div>
                <div className="settings-actions">
                  <button className="btn-primary" onClick={handleSaveChanges}>Guardar Cambios</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Configuración de Seguridad</h2>
              <div className="settings-card">
                {["current", "new", "confirm"].map((field) => (
                  <div key={field} className="setting-item">
                    <label htmlFor={`${field}Password`}>
                      {field === "current"
                        ? "Contraseña actual"
                        : field === "new"
                        ? "Nueva contraseña"
                        : "Confirmar nueva contraseña"}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={
                          (field === "current" && showCurrentPassword) ||
                          (field === "new" && showNewPassword) ||
                          (field === "confirm" && showConfirmPassword)
                            ? "text"
                            : "password"
                        }
                        id={`${field}Password`}
                        value={passwords[field]}
                        onChange={(e) =>
                          handlePasswordChange(field, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          field === "current"
                            ? setShowCurrentPassword(!showCurrentPassword)
                            : field === "new"
                            ? setShowNewPassword(!showNewPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {(field === "current" && showCurrentPassword) ||
                        (field === "new" && showNewPassword) ||
                        (field === "confirm" && showConfirmPassword) ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                {passwordError && (
                  <div className="password-error">{passwordError}</div>
                )}
              </div>
              <div className="settings-actions">
                <button className="btn-primary" onClick={handlePasswordChange}>Guardar Cambios</button>
                <button className="btn-secondary">Cancelar</button>
              </div>|
            </div>
          )}

          {activeTab === "users" && user.user.rol === "admin" && (            
            <div className="settings-section">
              <h2>Usuarios Registrados</h2>
              <UserCards users={activeUsers} onDelete={handleDeleteUser} />
              <UserModal visible={modalVisible} onClose={() => setModalVisible(false)} onRegister={handleRegister} />

              <div className="settings-actions">
                <button className="btn-primary" onClick={() => setModalVisible(true)}>Nuevo Usuario</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;