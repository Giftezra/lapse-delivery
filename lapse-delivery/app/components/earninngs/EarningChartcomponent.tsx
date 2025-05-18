import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EarningChartData } from "@/app/interfaces/EarningsInterface";
import { BarChart } from "react-native-gifted-charts";

const EarningChartcomponent = ({
  data,
  barContainerWidth,
}: {
  data: EarningChartData[];
  barContainerWidth: number;
}) => {
  return (
    <View style={styles.maincontainer}>
      <BarChart
        data={data}
        width={barContainerWidth}
        height={Dimensions.get("window").height * 0.15}
        showLine={false}
        showFractionalValues={false}
        showYAxisIndices={false}
        hideRules={true}
        xAxisThickness={0}
        yAxisThickness={0}
        hideAxesAndRules={true}
        barWidth={15}
        spacing={4}
        barBorderRadius={5}
        // noOfSections={0}
        renderTooltip={(item: any) => {
          return (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>${item.value}</Text>
            </View>
          );
        }}
        focusBarOnPress={true}
        focusedBarConfig={{
          color: "blue",
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default EarningChartcomponent;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
  },
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 5,
    borderRadius: 4,
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});
