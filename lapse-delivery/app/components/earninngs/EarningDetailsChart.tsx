import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import { EarningChartData } from "@/app/interfaces/EarningsInterface";

interface Props {
  data: EarningChartData[];
}

const EarningDetailsChart = ({ data }: Props) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  // Calculate bar width based on container width
  const containerWidth = Dimensions.get("window").width - 40; // 20px padding on each side
  const barWidth = (containerWidth / data.length) * 0.6; // 60% of available space per bar
  const spacing = (containerWidth / data.length) * 0.4; // 40% for spacing

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * 200; // Max height of 200
            return (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      width: barWidth,
                      marginHorizontal: spacing / 2,
                    },
                  ]}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EarningDetailsChart;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  chartContainer: {
    height: 250, // Includes space for labels
  },
  barsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 20, // Space for labels
  },
  barWrapper: {
    alignItems: "center",
  },
  bar: {
    backgroundColor: "#000",
    borderRadius: 4,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: "#000",
  },
});
