// Colores para modo claro
const lightColors = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",

  // Grises
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",

  // Fondo y superficie
  background: "#ffffff",
  surface: "#f8fafc",
  card: "#ffffff",

  // Texto
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  textTertiary: "#9ca3af",

  // Específicos para sensores
  temperature: "#3b82f6",
  humidity: "#10b981",
  movement: "#8b5cf6",
  airQuality: "#f59e0b",
};

// Colores para modo oscuro
const darkColors = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",

  // Grises
  gray50: "#1e293b",
  gray100: "#334155",
  gray200: "#475569",
  gray300: "#64748b",
  gray400: "#94a3b8",
  gray500: "#cbd5e1",
  gray600: "#e2e8f0",
  gray700: "#f1f5f9",
  gray800: "#f8fafc",
  gray900: "#ffffff",

  // Fondo y superficie
  background: "#0f172a",
  surface: "#1e293b",
  card: "#334155",

  // Texto
  textPrimary: "#f1f5f9",
  textSecondary: "#cbd5e1",
  textTertiary: "#94a3b8",

  // Específicos para sensores
  temperature: "#3b82f6",
  humidity: "#10b981",
  movement: "#8b5cf6",
  airQuality: "#f59e0b",
};

// Ya no exportamos colores estáticos, usamos ThemeContext en su lugar

// Tipografía
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
  },
  h4: {
    fontSize: 18,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
  },
};

// Espaciado
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordes y sombras
export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
