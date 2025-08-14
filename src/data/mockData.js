// Datos simulados para el dashboard móvil
export const sensorData = [
  {
    id: 1,
    title: "Temperatura",
    value: "24.5°C",
    icon: "thermometer",
    trend: "+2.1%",
    isPositive: true,
    color: "#3b82f6",
    colorName: "blue",
  },
  {
    id: 2,
    title: "Humedad",
    value: "65%",
    icon: "droplets",
    trend: "-1.2%",
    isPositive: false,
    color: "#10b981",
    colorName: "green",
  },
  {
    id: 3,
    title: "Movimiento",
    value: "Activo",
    icon: "activity",
    trend: "+12 eventos",
    isPositive: true,
    color: "#8b5cf6",
    colorName: "purple",
  },
];

export const chartData = {
  temperature: {
    daily: [
      { time: "17/07", value: 22 },
      { time: "18/07", value: 20 },
      { time: "19/07", value: 24 },
      { time: "20/07", value: 28 },
      { time: "21/07", value: 26 },
      { time: "22/07", value: 24 },
      { time: "23/07", value: 23 },
    ],
    weekly: [
      { time: "Lun", value: 24 },
      { time: "Mar", value: 26 },
      { time: "Mié", value: 23 },
      { time: "Jue", value: 25 },
      { time: "Vie", value: 27 },
      { time: "Sáb", value: 29 },
      { time: "Dom", value: 25 },
    ],
    monthly: [
      { time: "Ene", value: 18 },
      { time: "Feb", value: 20 },
      { time: "Mar", value: 24 },
      { time: "Abr", value: 26 },
      { time: "May", value: 28 },
      { time: "Jun", value: 30 },
    ],
  },
  humidity: {
    daily: [
      { time: "17/07", value: 68 },
      { time: "18/07", value: 72 },
      { time: "19/07", value: 65 },
      { time: "20/07", value: 58 },
      { time: "21/07", value: 62 },
      { time: "22/07", value: 66 },
      { time: "23/07", value: 65 },
    ],
    weekly: [
      { time: "Lun", value: 65 },
      { time: "Mar", value: 68 },
      { time: "Mié", value: 62 },
      { time: "Jue", value: 70 },
      { time: "Vie", value: 66 },
      { time: "Sáb", value: 64 },
      { time: "Dom", value: 67 },
    ],
    monthly: [
      { time: "Ene", value: 72 },
      { time: "Feb", value: 68 },
      { time: "Mar", value: 65 },
      { time: "Abr", value: 62 },
      { time: "May", value: 58 },
      { time: "Jun", value: 60 },
    ],
  },
  movement: {
    daily: [
      { time: "17/07", value: 1 },
      { time: "18/07", value: 0 },
      { time: "19/07", value: 1 },
      { time: "20/07", value: 1 },
      { time: "21/07", value: 0 },
      { time: "22/07", value: 0 },
      { time: "23/07", value: 0 },
    ],
    weekly: [
      { time: "Lun", value: 35 },
      { time: "Mar", value: 42 },
      { time: "Mié", value: 28 },
      { time: "Jue", value: 48 },
      { time: "Vie", value: 52 },
      { time: "Sáb", value: 38 },
      { time: "Dom", value: 25 },
    ],
    monthly: [
      { time: "Ene", value: 320 },
      { time: "Feb", value: 380 },
      { time: "Mar", value: 420 },
      { time: "Abr", value: 460 },
      { time: "May", value: 510 },
      { time: "Jun", value: 480 },
    ],
  },
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
    message: "Sensors Online",
    time: "now",
    icon: "check-circle",
    color: "#10b981",
  },
 
];



// Estados de sensores para los toggles
export const sensorStates = {
  temperature: true,
  humidity: false,
  movement: true,
  airQuality: false,
};
