import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../screens/DashboardScreen";
import TemperatureScreen from "../screens/TemperatureScreen";
import HumidityScreen from "../screens/HumidityScreen";
import MovementScreen from "../screens/MovementScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

// Colores directos - sin imports externos
const colors = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",
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
  text: "#1f2937",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  textTertiary: "#9ca3af",
  temperature: "#3b82f6",
  humidity: "#10b981",
  movement: "#8b5cf6",
  airQuality: "#f59e0b",
  background: "#f8fafc",
  surface: "#ffffff",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "#000000",
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Temperatura") {
            iconName = focused ? "thermometer" : "thermometer-outline";
          } else if (route.name === "Humedad") {
            iconName = focused ? "water" : "water-outline";
          } else if (route.name === "Movimiento") {
            iconName = focused ? "pulse" : "pulse-outline";
          } else if (route.name === "Configuración") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Inicio",
        }}
      />
      <Tab.Screen
        name="Temperatura"
        component={TemperatureScreen}
        options={{
          tabBarLabel: "Temperatura",
        }}
      />
      <Tab.Screen
        name="Humedad"
        component={HumidityScreen}
        options={{
          tabBarLabel: "Humedad",
        }}
      />
      <Tab.Screen
        name="Movimiento"
        component={MovementScreen}
        options={{
          tabBarLabel: "Movimiento",
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
