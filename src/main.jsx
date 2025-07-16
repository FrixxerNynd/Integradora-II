import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/Auth/AuthContext.jsx";
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
