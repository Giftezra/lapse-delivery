import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";

const WeeklyEarningComponent = ({
  dayFrom,
  dayTo,
  currency,
  current_earning,
}: {
  dayFrom: any;
  dayTo: any;
  currency: string;
  current_earning: number;
}) => {
  return (
    <View style={styles.maincontainer}>
      <StyledText
        children={"Earnings"}
        variant="titleLarge"
        style={styles.earningTitleText}
      />
      <StyledText children={`${dayFrom} - ${dayTo}`} variant="labelSmall" />
      <View style={styles.earningContainer}>
        <StyledText
          children={`${currency}`}
          variant="titleMedium"
        />
        <StyledText
          children={`${current_earning.toFixed(2)}`}
          variant="titleMedium"
          style={styles.earningText}
        />
      </View>
    </View>
  );
};

export default WeeklyEarningComponent;

const styles = StyleSheet.create({
  maincontainer: {
    padding: 10,
    gap: 5,
  },
  earningTitleText: {
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 30,
    fontFamily: "RobotoRegu lar",
  },
  earningContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  earningText: {
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 30,
    fontFamily: "OswaldVariable",
  },
});
