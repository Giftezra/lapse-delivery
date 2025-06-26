import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import { EarningStatsInterface } from "@/app/interfaces/EarningsInterface";

interface OnlineDurationComponentProps extends EarningStatsInterface {
  onPress: () => void;
}

const OnlineDurationComponent = ({
  onPress,
  duration,
  trips,
  points,
}: OnlineDurationComponentProps) => {
  return (
    <Pressable style={styles.maincontainer} onPress={onPress}>
      <View style={styles.rowsection}>
        <StyledText children="Online" variant="labelMedium" />
        <StyledText children={duration} variant="labelSmall" />
      </View>
      <View style={styles.rowsection}>
        <StyledText children="trips" variant="labelMedium" />
        <StyledText children={trips} variant="labelSmall" />
      </View>
      <View style={styles.rowsection}>
        <StyledText children="points" variant="labelMedium" />
        <StyledText children={points} variant="labelSmall" />
      </View>
    </Pressable>
  );
};

export default OnlineDurationComponent;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
  rowsection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "gray",
  },
});
