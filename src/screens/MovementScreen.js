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

const MovementScreen = ({ navigation }) => {
  const [sensorEnabled, setSensorEnabled] = useState(true);
  const [movementData, setMovementData] = useState([]);
  

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
        value: record.movimiento
      }));
      setMovementData(formattedData);
    };
    getCurrentData();
  }, []);

  const currentData = movementData;

  const currentMovement = currentData.length > 0 ? currentData[currentData.length - 1]?.value : 0;
  const maxMovement = currentData.length > 0 ? Math.max(...currentData.map((item) => item.value)) : 0;
  const totalEvents = currentData.length > 0 ? currentData.reduce((sum, item) => sum + item.value, 0) : 0;
  const avgMovement = currentData.length > 0 ? (totalEvents / currentData.length).toFixed(1) : 0;

  const getMovementStatus = (movement) => {
    if (movement > 40)
      return { status: "Alta Actividad", color: colors.danger };
    if (movement > 20)
      return { status: "Actividad Moderada", color: colors.warning };
    if (movement > 5)
      return { status: "Actividad Baja", color: colors.success };
    return { status: "Sin Actividad", color: colors.gray400 };
  };

  const movementStatus = getMovementStatus(currentMovement);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Movimiento
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Sensor de actividad
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
            <View style={styles.movementIcon}>
              <Ionicons name="pulse" size={24} color={colors.movement} />
            </View>
            <View style={styles.currentValueInfo}>
              <Text style={styles.currentValue}>{currentMovement}</Text>
              <Text style={styles.currentLabel}>Eventos/Hora</Text>
              <View style={styles.statusBadge}>
                <Text
                  style={[styles.statusText, { color: movementStatus.color }]}
                >
                  {movementStatus.status}
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
          <Text style={styles.sectionTitle}>Actividad de Movimiento</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={currentData}
              color={colors.movement}
              height={250}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="trending-up" size={20} color={colors.danger} />
              <Text style={styles.statValue}>{maxMovement}</Text>
              <Text style={styles.statLabel}>Pico Máximo</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={20} color={colors.movement} />
              <Text style={styles.statValue}>{avgMovement}</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="layers" size={20} color={colors.primary} />
              <Text style={styles.statValue}>{totalEvents}</Text>
              <Text style={styles.statLabel}>Total Eventos</Text>
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
  movementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.movement + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  currentValueInfo: {
    flex: 1,
  },
  currentValue: {
    ...typography.h1,
    color: colors.movement,
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
  zonesSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  zonesCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  zoneItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  zoneHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  zoneTitle: {
    ...typography.body,
    fontWeight: "500",
    flex: 1,
    marginLeft: spacing.sm,
  },
  zoneStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  zoneActive: {
    backgroundColor: colors.success,
  },
  zoneInactive: {
    backgroundColor: colors.gray300,
  },
  zoneModerate: {
    backgroundColor: colors.warning,
  },
  zoneDetail: {
    ...typography.caption,
    marginLeft: 26,
  },
  timelineSection: {
    marginHorizontal: spacing.lg,
  },
  timelineCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.sm,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: spacing.xs,
    marginRight: spacing.sm,
  },
  timelineContent: {
    flex: 1,
  },
  timelineText: {
    ...typography.body,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  timelineTime: {
    ...typography.caption,
  },
  alertSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
  movementInput: {
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
    backgroundColor: colors.movement,
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
    backgroundColor: colors.movement,
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

export default MovementScreen;
