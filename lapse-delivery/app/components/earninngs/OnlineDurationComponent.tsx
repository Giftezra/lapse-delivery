import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import { OnlineDurationAndTripsData } from "@/app/interfaces/EarningsInterface";

interface OnlineDurationComponentProps extends OnlineDurationAndTripsData {
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
        <StyledText children="Online" variant="h5" />
        <StyledText children={duration} variant="h5" />
      </View>
      <View style={styles.rowsection}>
        <StyledText children="trips" variant="h5" />
        <StyledText children={trips} variant="h5" />
      </View>
      <View style={styles.rowsection}>
        <StyledText children="points" variant="h5" />
        <StyledText children={points} variant="h5" />
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
