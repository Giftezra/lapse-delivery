import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
interface WeeklyPaymentComponentProps {
  date: string;
  payout: number;
  currency: string;
}

const WeeklyPaymentComponent = ({ date, payout, currency }: WeeklyPaymentComponentProps) => {
  return (
    <View style={styles.maincontainer}>
      <StyledText children="Recent Payouts" variant="h4" />
      <View style={styles.mainsection}>
        <View style={styles.section1}>
          <MaterialIcons name='calendar-month' size={24} color="black" />
          <View>
            <StyledText children="Weekly Payment" variant="h4" />
            <StyledText children={date} variant="h5" />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 1}}>
          <StyledText children={currency} variant="h5" />
          <StyledText children={payout.toFixed(2)} variant="h4" style={{fontFamily:'OswaldVariable'}}/>
        </View>
      </View>
    </View>
  );
};

export default WeeklyPaymentComponent;

const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    padding: 15,


  },
  mainsection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
  },
  section1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
});
