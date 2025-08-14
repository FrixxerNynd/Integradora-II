import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chartData } from "../data/mockData";
import { typography, spacing, borderRadius, shadows } from "../styles/theme";
import LineChart from "../components/LineChart";
import SensorToggle from "../components/SensorToggle";
import { getData, filterData } from "../service/ConectionFunctions";

const { width } = Dimensions.get("window");

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

const TemperatureScreen = ({ navigation }) => {
  const [sensorEnabled, setSensorEnabled] = useState(true);
  const [timeFilter, setTimeFilter] = useState("daily");
  const [temperatureData, setTemperatureData] = useState([]);

useEffect(() => {
  const fetchTemperatureData = async () => {
    try {
      const data = await getData(); // Llamada al backend

      // Filtrar solo los datos del día de hoy
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filtered = data.filter(record => new Date(record.fecha) >= today);

      // Mapear al formato {time, value} para tu LineChart
      const formattedData = filtered.map(record => ({
        time: new Date(record.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: record.temperatura
      }));

      setTemperatureData(formattedData);
    } catch (error) {
      console.error("Error al obtener datos de temperatura:", error);
    }
  };

  fetchTemperatureData();
}, []); // Se ejecuta solo al montar

// Cálculos protegidos
const currentTemp = temperatureData.length > 0 ? temperatureData[temperatureData.length - 1].value : 24;
const minTemp = temperatureData.length > 0 ? Math.min(...temperatureData.map(item => item.value)) : 0;
const maxTemp = temperatureData.length > 0 ? Math.max(...temperatureData.map(item => item.value)) : 0;
const avgTemp = temperatureData.length > 0 ? (temperatureData.reduce((sum, item) => sum + item.value, 0) / temperatureData.length).toFixed(1) : 0;



  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Temperatura
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Sensor de ambiente
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Current Value Card */}
        <View
          style={[styles.currentValueCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.currentValueHeader}>
            <View style={styles.tempIcon}>
              <Ionicons
                name="thermometer"
                size={24}
                color={colors.temperature}
              />
            </View>
            <View style={styles.currentValueInfo}>
              <Text
                style={[styles.currentValue, { color: colors.textPrimary }]}
              >
                {currentTemp}°C
              </Text>
              <Text
                style={[styles.currentLabel, { color: colors.textSecondary }]}
              >
                Temperatura Actual
              </Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: sensorEnabled
                    ? colors.success
                    : colors.gray300,
                },
              ]}
            >
              <View style={styles.statusDot} />
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Historial de Temperatura
          </Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={temperatureData.temperatura}
              color={colors.temperature}
              height={250}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Estadísticas
          </Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Ionicons name="arrow-up" size={20} color={colors.danger} />
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {maxTemp}°C
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Máxima
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Ionicons name="arrow-down" size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {minTemp}°C
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Mínima
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Ionicons name="analytics" size={20} color={colors.success} />
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {avgTemp}°C
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Promedio
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.sm,
  },
  backButton: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    ...typography.h3,
  },
  headerSubtitle: {
    ...typography.caption,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  currentValueCard: {
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  currentValueHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  tempIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.temperature + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  currentValueInfo: {
    flex: 1,
  },
  currentValue: {
    ...typography.h1,
    color: colors.temperature,
    marginBottom: spacing.xs,
  },
  currentLabel: {
    ...typography.bodySecondary,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
  toggleSection: {
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.md,
  },
  chartSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  statsSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: "center",
    ...shadows.sm,
  },
  statValue: {
    ...typography.h4,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    textAlign: "center",
  },
  alertSection: {
    marginHorizontal: spacing.lg,
  },
  alertCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray50,
    marginBottom: spacing.sm,
  },
  editIcon: {
    marginLeft: "auto",
  },
  alertText: {
    ...typography.body,
    marginLeft: spacing.sm,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    width: "100%",
    maxWidth: 320,
    ...shadows.lg,
  },
  modalTitle: {
    ...typography.h3,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.body,
    fontWeight: "500",
    marginBottom: spacing.sm,
  },
  temperatureInput: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: colors.gray50,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.gray200,
  },
  saveButton: {
    backgroundColor: colors.temperature,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.textSecondary,
  },
  saveButtonText: {
    ...typography.button,
    color: "white",
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.md,
    alignSelf: "flex-start",
  },
  filterButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginHorizontal: spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: colors.temperature,
  },
  filterText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  filterTextActive: {
    color: "white",
    fontWeight: "600",
  },
});

export default TemperatureScreen;
