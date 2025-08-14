import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const colors = {
  primary: "#3b82f6",
  gray50: "#f9fafb",
  gray300: "#d1d5db",
  textSecondary: "#6b7280",
  card: "#ffffff",
  shadow: "#000000",
};

const LineChart = ({
  data = [], // 🔹 Inicializamos data como array vacío
  color = colors.primary,
  height = 200,
  showGrid = true,
}) => {
  if (!data || data.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { height, backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        <Text style={{ textAlign: "center", marginTop: 20, color: colors.textSecondary }}>
          No hay datos disponibles
        </Text>
      </View>
    );
  }

  const chartWidth = width - 48;
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue || 1;
  const chartHeight = height - 60; // espacio para labels

  const getPointPosition = (value, index) => {
    const x = (index / (data.length - 1)) * (chartWidth - 40);
    const y = chartHeight - ((value - minValue) / range) * chartHeight;
    return { x: x + 20, y: y + 20 };
  };

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <View style={styles.chartArea}>
        <View style={styles.chartContainer}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>{maxValue}</Text>
            <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>
              {Math.round((maxValue + minValue) / 2)}
            </Text>
            <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>{minValue}</Text>
          </View>

          {/* Chart area con puntos */}
          <View style={styles.chartContent}>
            {showGrid && (
              <View style={styles.gridLines}>
                <View style={[styles.gridLine, { backgroundColor: colors.gray300 }]} />
                <View style={[styles.gridLine, { backgroundColor: colors.gray300 }]} />
                <View style={[styles.gridLine, { backgroundColor: colors.gray300 }]} />
              </View>
            )}

            <View style={styles.dataArea}>
              {data.map((item, index) => {
                const point = getPointPosition(item.value, index);
                return (
                  <View
                    key={index}
                    style={[
                      styles.dataPoint,
                      { left: point.x - 3, top: point.y - 3, backgroundColor: color },
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>

        {/* X-axis labels */}
        <View style={styles.xAxis}>
          {data.map((item, index) => {
            if (index % 2 === 0 || index === data.length - 1) {
              const point = getPointPosition(item.value, index);
              return (
                <Text
                  key={index}
                  style={[styles.xAxisLabel, { left: point.x - 15, color: colors.textSecondary }]}
                >
                  {item.time}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartArea: { flex: 1, padding: 16 },
  chartContainer: { flex: 1, flexDirection: "row" },
  yAxis: { width: 40, justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8 },
  axisLabel: { fontSize: 12 },
  chartContent: { flex: 1, position: "relative" },
  gridLines: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "space-between" },
  gridLine: { height: 1 },
  dataArea: { flex: 1, position: "relative" },
  dataPoint: { position: "absolute", width: 6, height: 6, borderRadius: 3 },
  xAxis: { height: 20, position: "relative", marginTop: 8, marginLeft: 40 },
  xAxisLabel: { position: "absolute", fontSize: 12, width: 30, textAlign: "center" },
});

export default LineChart;
