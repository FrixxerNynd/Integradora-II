import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

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

const SensorToggle = ({
  isEnabled,
  onToggle,
  label = "Sensor",
  size = "medium", // 'small', 'medium', 'large'
}) => {
  // Valor de animación para el toggle
  const animatedValue = React.useRef(
    new Animated.Value(isEnabled ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEnabled]);

  const handlePress = () => {
    onToggle(!isEnabled);
  };

  const getSizes = () => {
    switch (size) {
      case "small":
        return {
          container: { width: 44, height: 24 },
          thumb: { width: 20, height: 20 },
          margin: 2,
        };
      case "large":
        return {
          container: { width: 64, height: 36 },
          thumb: { width: 32, height: 32 },
          margin: 2,
        };
      default: // medium
        return {
          container: { width: 54, height: 30 },
          thumb: { width: 26, height: 26 },
          margin: 2,
        };
    }
  };

  const sizes = getSizes();

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      sizes.margin,
      sizes.container.width - sizes.thumb.width - sizes.margin,
    ],
  });

  // Usamos los colores estáticos directamente
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colors.gray200, // Ahora usamos colors directamente
      colors.primary, // Ahora usamos colors directamente
    ],
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[styles.toggleTrack, sizes.container, { backgroundColor }]}
        >
          <Animated.View
            style={[
              styles.toggleThumb,
              sizes.thumb,
              {
                transform: [{ translateX: thumbTranslateX }],
                shadowColor: "#000000", // Color fijo en lugar de usar colors dinámico
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  toggleContainer: {
    marginLeft: 16,
  },
  toggleTrack: {
    borderRadius: 999,
    justifyContent: "center",
  },
  toggleThumb: {
    backgroundColor: "white", // Color fijo para el pulgar del toggle
    borderRadius: 999,
    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SensorToggle;
