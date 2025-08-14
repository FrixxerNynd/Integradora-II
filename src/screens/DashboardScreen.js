import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { sensorData, activityData, chartData } from "../data/mockData";
import { typography, spacing, borderRadius, shadows } from "../styles/theme";
import LineChart from "../components/LineChart";
import { getData } from "../service/ConectionFunctions";

const { width } = Dimensions.get("window");

// Colores directos - sin imports externos
const colors = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",
  gray50: "#f8fafc",
  gray100: "#f1f5f9",
  gray200: "#e2e8f0",
  gray300: "#cbd5e1",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1e293b",
  gray900: "#0f172a",
  text: "#1e293b",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textTertiary: "#94a3b8",
  temperature: "#3b82f6",
  humidity: "#10b981",
  movement: "#8b5cf6",
  airQuality: "#f59e0b",
  background: "#f8fafc",
  surface: "#ffffff",
  card: "#ffffff",
  border: "#e2e8f0",
  shadow: "#000000",
};



const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [data, setDataInfo] = useState({});
  const [latestRecord, setLatestRecord] = useState({});
  const [temperatureChartData, setTemperatureChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getData();
        // Tomamos el último registro del array
        if (allData.length > 0) {
          setLatestRecord(allData[allData.length - 1]);
        }
        const formattedTempData = allData.map((record) => {
          const date = new Date(record.fecha);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          return {
            time: `${day}/${month}`, // Solo día y mes
            value: record.temperatura,
          };
        });


        setTemperatureChartData(formattedTempData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);
  const sensors = [
    {
      title: "Temperatura",
      icon: "thermometer",
      color: colors.temperature,
      value: latestRecord?.temperatura ?? "-",
    },
    {
      title: "Humedad",
      icon: "droplets",
      color: colors.humidity,
      value: latestRecord?.humedad ?? "-",
    },
    {
      title: "Movimiento",
      icon: "activity",
      color: colors.movement,
      value: latestRecord?.movimiento ? "Activo" : "Inactivo",
    },
  ];

  const handleSensorPress = (sensor) => {
    switch (sensor.title) {
      case "Temperatura":
        navigation.navigate("TemperatureScreen");
        break;
      case "Humedad":
        navigation.navigate("HumidityScreen");
        break;
      case "Movimiento":
        navigation.navigate("MovementScreen");
        break;
      default:
        break;
    }
  };

  const getIconName = (iconType) => {
    switch (iconType) {
      case "thermometer":
        return "thermometer";
      case "droplets":
        return "water";
      case "activity":
        return "pulse";
      default:
        return "help-circle";
    }
  };

  const getActivityIcon = (iconType) => {
    switch (iconType) {
      case "check-circle":
        return "checkmark-circle";
      case "alert-triangle":
        return "warning";
      case "info":
        return "information-circle";
      default:
        return "help-circle";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hola, {user?.name || "Usuario"}</Text>
          <Text style={styles.subtitle}>Panel de Control IoT</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sensor Cards Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sensores</Text>
          <View style={styles.sensorGrid}>
            {sensors.map((sensor) => (
              <TouchableOpacity
                key={sensor.id}
                style={[styles.sensorCard, { borderLeftColor: sensor.color }]}
                onPress={() => handleSensorPress(sensor)}
                activeOpacity={0.7}
              >
                <View style={styles.sensorHeader}>
                  <View
                    style={[
                      styles.sensorIcon,
                      { backgroundColor: sensor.color + "15" },
                    ]}
                  >
                    <Ionicons
                      name={getIconName(sensor.icon)}
                      size={24}
                      color={sensor.color}
                    />
                  </View>
                  <View style={styles.sensorInfo}>
                    <Text style={styles.sensorTitle}>{sensor.title}</Text>
                    <Text style={styles.sensorValue}>{sensor.value}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Temperature Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Temperatura - Últimas 24 Horas
          </Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={temperatureChartData}
              color={colors.temperature}
              height={200}
            />
          </View>
        </View>

        {/* Activity Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <View style={styles.activityContainer}>
            {activityData.slice(0, 4).map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: activity.color + "15" },
                  ]}
                >
                  <Ionicons
                    name={getActivityIcon(activity.icon)}
                    size={16}
                    color={activity.color}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    ...shadows.sm,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySecondary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
  logoutButton: {
    padding: spacing.sm,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  sensorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sensorCard: {
    width: (width - spacing.lg * 3) / 2,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  sensorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sensorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorTitle: {
    ...typography.bodySecondary,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  sensorValue: {
    ...typography.h4,
    fontSize: 16,
    fontWeight: "bold",
  },
  sensorTrend: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendText: {
    ...typography.caption,
    marginLeft: spacing.xs,
    fontWeight: "500",
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  activityContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    ...typography.body,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  activityTime: {
    ...typography.caption,
  },
  quickStats: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    textAlign: "center",
  },
});

export default DashboardScreen;
