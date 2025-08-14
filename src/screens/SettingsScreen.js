import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { typography, spacing, borderRadius, shadows } from "../styles/theme";

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

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsOptions = [
    {
      id: 1,
      title: "Notificaciones",
      icon: "notifications-outline",
      type: "toggle",
      value: notificationsEnabled,
      action: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: 2,
      title: "Calibrar Sensores",
      icon: "settings-outline",
      type: "navigation",
    },
    {
      id: 3,
      title: "Historial de Datos",
      icon: "time-outline",
      type: "navigation",
    },
    {
      id: 4,
      title: "Exportar Datos",
      icon: "download-outline",
      type: "navigation",
    },
  ];

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.settingItem, { backgroundColor: colors.card }]}
        onPress={item.action}
        disabled={item.type === "toggle"}
      >
        <View style={styles.settingLeft}>
          <View
            style={[styles.settingIcon, { backgroundColor: colors.surface }]}
          >
            <Ionicons name={item.icon} size={20} color={colors.primary} />
          </View>
          <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.settingRight}>
          {item.type === "toggle" ? (
            <Switch
              value={item.value}
              onValueChange={item.action}
              trackColor={{ false: colors.gray300, true: colors.primary }}
              thumbColor={colors.card}
            />
          ) : (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };
  

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Perfil
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Visualiza tus datos
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Info */}
        <View style={[styles.userSection, { backgroundColor: colors.card }]}>
          <View
            style={[styles.userAvatar, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.userInitial}>
              {user?.name?.toUpperCase() || "A"}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>
              {user?.name || ""}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user?.email || ""}
            </Text>
          </View>
        </View>

      
        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.danger }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>
            NeoDev Mobile v1.0.0
          </Text>
          <Text style={[styles.appCopyright, { color: colors.textTertiary }]}>
            © 2025 NeoDev. Todos los derechos reservados.
          </Text>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.bodySecondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.8)",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  userInitial: {
    ...typography.h3,
    color: "#ffffff",
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
  },
  settingsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.8)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    flex: 1,
  },
  settingRight: {
    marginLeft: spacing.md,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  logoutText: {
    ...typography.body,
    color: "#ffffff",
    fontWeight: "500",
    marginLeft: spacing.sm,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  appVersion: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  appCopyright: {
    ...typography.caption,
    textAlign: "center",
  },
});

export default SettingsScreen;
