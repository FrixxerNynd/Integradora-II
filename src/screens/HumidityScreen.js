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

const HumidityScreen = ({ navigation }) => {
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const [timeFilter, setTimeFilter] = useState("daily");
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => { 
    const getCurrentData = async () => {
      const data = await getData();

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const filtered = data.filter(record => new Date(record.fecha) >= today);
      const formattedData = filtered.map(record => ({
        time: new Date(record.fecha).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        value: record.humedad
      }));
      setHumidityData(formattedData);
    };
    getCurrentData();
  }, []);

  const currentData = humidityData;

  const currentHumidity = currentData.length > 0 ? currentData[currentData.length - 1]?.value : 65;
  const minHumidity = currentData.length > 0 ? Math.min(...currentData.map((item) => item.value)) : 0;
  const maxHumidity = currentData.length > 0 ? Math.max(...currentData.map((item) => item.value)) : 0;
  const avgHumidity = currentData.length > 0 ? (
    currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length
  ).toFixed(1) : 0;

  const getHumidityStatus = (humidity) => {
    if (humidity < 30) return { status: "Muy Baja", color: colors.danger };
    if (humidity < 40) return { status: "Baja", color: colors.warning };
    if (humidity > 70) return { status: "Alta", color: colors.warning };
    if (humidity > 80) return { status: "Muy Alta", color: colors.danger };
    return { status: "Óptima", color: colors.success };
  };

  const humidityStatus = getHumidityStatus(currentHumidity);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Humedad
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
        <View style={styles.currentValueCard}>
          <View style={styles.currentValueHeader}>
            <View style={styles.humidityIcon}>
              <Ionicons name="water" size={24} color={colors.humidity} />
            </View>
            <View style={styles.currentValueInfo}>
              <Text style={styles.currentValue}>{currentHumidity}%</Text>
              <Text style={styles.currentLabel}>Humedad Relativa</Text>
              <View style={styles.statusBadge}>
                <Text
                  style={[styles.statusText, { color: humidityStatus.color }]}
                >
                  {humidityStatus.status}
                </Text>
              </View>
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
          <Text style={styles.sectionTitle}>Historial de Humedad</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={currentData}
              color={colors.humidity}
              height={250}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="arrow-up" size={20} color={colors.warning} />
              <Text style={styles.statValue}>{maxHumidity}%</Text>
              <Text style={styles.statLabel}>Máxima</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="arrow-down" size={20} color={colors.primary} />
              <Text style={styles.statValue}>{minHumidity}%</Text>
              <Text style={styles.statLabel}>Mínima</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={20} color={colors.humidity} />
              <Text style={styles.statValue}>{avgHumidity}%</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
          </View>
        </View>

        {/* Humidity Levels Guide */}
        <View style={styles.guideSection}>
          <Text style={styles.sectionTitle}>Niveles de Humedad</Text>
          <View style={styles.guideCard}>
            <View style={styles.guideItem}>
              <View
                style={[
                  styles.guideIndicator,
                  { backgroundColor: colors.success },
                ]}
              />
              <Text style={styles.guideText}>40-60%: Óptimo para confort</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[
                  styles.guideIndicator,
                  { backgroundColor: colors.warning },
                ]}
              />
              <Text style={styles.guideText}>30-40% / 60-70%: Aceptable</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[
                  styles.guideIndicator,
                  { backgroundColor: colors.danger },
                ]}
              />
              <Text style={styles.guideText}>
                &lt;30% / &gt;70%: Problemático
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
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
    color: colors.textSecondary,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  currentValueCard: {
    margin: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  currentValueHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  humidityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.humidity + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  currentValueInfo: {
    flex: 1,
  },
  currentValue: {
    ...typography.h1,
    color: colors.humidity,
    marginBottom: spacing.xs,
  },
  currentLabel: {
    ...typography.bodySecondary,
    marginBottom: spacing.xs,
  },
  statusBadge: {
    alignSelf: "flex-start",
  },
  statusText: {
    ...typography.caption,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  guideSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  guideCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  guideIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  guideText: {
    ...typography.body,
    fontSize: 14,
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
  humidityInput: {
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
    backgroundColor: colors.humidity,
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
    backgroundColor: colors.humidity,
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

export default HumidityScreen;
