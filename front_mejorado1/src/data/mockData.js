// Datos simulados para el dashboard
export const sensorData = [
  {
    id: 1,
    title: "Temperatura",
    value: "24.5°C",
    icon: "thermometer",
    trend: "+2.1%",
    isPositive: true,
    color: "blue",
  },
  {
    id: 2,
    title: "Humedad",
    value: "65%",
    icon: "droplets",
    trend: "-1.2%",
    isPositive: false,
    color: "green",
  },
  {
    id: 3,
    title: "Movimiento",
    value: "Activo",
    icon: "movement",
    trend: "+12 eventos",
    isPositive: true,
    color: "purple",
  },
  {
    id: 4,
    title: "Calidad del Aire",
    value: "Buena",
    icon: "wind",
    trend: "+5.2%",
    isPositive: true,
    color: "orange",
  },
];

export const chartData = {
  temperature: [
    { time: "00:00", value: 22 },
    { time: "04:00", value: 20 },
    { time: "08:00", value: 24 },
    { time: "12:00", value: 28 },
    { time: "16:00", value: 26 },
    { time: "20:00", value: 24 },
    { time: "24:00", value: 23 },
  ],
  humidity: [
    { time: "00:00", value: 68 },
    { time: "04:00", value: 72 },
    { time: "08:00", value: 65 },
    { time: "12:00", value: 58 },
    { time: "16:00", value: 62 },
    { time: "20:00", value: 66 },
    { time: "24:00", value: 65 },
  ],
  energyConsumption: [
    { name: "Lighting", value: 35, color: "#3b82f6" },
    { name: "HVAC", value: 45, color: "#10b981" },
    { name: "Equipment", value: 20, color: "#f59e0b" },
  ],
};

export const activityData = [
  {
    id: 1,
    type: "alert",
    message: "Temperature sensor calibrated",
    time: "2 minutes ago",
    icon: "check-circle",
  },
  {
    id: 2,
    type: "warning",
    message: "High humidity detected in Zone 3",
    time: "15 minutes ago",
    icon: "alert-triangle",
  },
  {
    id: 3,
    type: "info",
    message: "System backup completed",
    time: "1 hour ago",
    icon: "info",
  },
  {
    id: 4,
    type: "success",
    message: "All sensors online",
    time: "2 hours ago",
    icon: "check-circle",
  },
];

export const statsData = [
  {
    title: "Total Devices",
    value: "127",
    change: "+12%",
    isPositive: true,
  },
  {
    title: "Active Users",
    value: "1,429",
    change: "+5.2%",
    isPositive: true,
  },
  {
    title: "Energy Saved",
    value: "23.5 kWh",
    change: "-2.1%",
    isPositive: false,
  },
  {
    title: "System Uptime",
    value: "99.8%",
    change: "+0.1%",
    isPositive: true,
  },
];
