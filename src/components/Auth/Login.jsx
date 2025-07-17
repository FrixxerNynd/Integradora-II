import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { loginApi } from "../../Service/AuthService";
import { useAuth } from "./AuthContext";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi(credentials);
      if (response.user && response.token) {
        console.log('%cLogin Success: Calling auth.login() with user:', 'color: green;', response.user);
        auth.login(
          response.user, 
          credentials.email, 
          response.token, 
          false
        );
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">🚀</div>
            <h1>NeoDev</h1>
          </div>
          <p>Accede a tu panel de control</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Correo</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="demo-credentials">
            <small>Demo: admin / admin</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
