import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { WeeklyTransactionInterface } from "@/app/interfaces/WalletInterface";
interface WeeklyPaymentComponentProps {
  data: WeeklyTransactionInterface;
  onPress: () => void;
}

const WeeklyPaymentComponent = ({ data, onPress }: WeeklyPaymentComponentProps) => {
  return (
    <TouchableOpacity style={styles.maincontainer} onPress={onPress}>
      <StyledText children="Recent Payouts" variant="labelMedium" />
      <View style={styles.mainsection}>
        <View style={styles.section1}>
          <MaterialIcons name='calendar-month' size={24} color="black" />
          <View>
            <StyledText children="Weekly Payment" variant="labelMedium" />
            <StyledText children={data.initiated_date} variant="labelSmall" />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 1}}>
          <StyledText children={data.currency} variant="labelMedium" />
          <StyledText children={data.amount.toFixed(2)} variant="titleMedium" style={{fontFamily:'OswaldVariable'}}/>
        </View>
      </View>
    </TouchableOpacity>
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
