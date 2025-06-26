import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import BalanceInterface from "@/app/interfaces/BalanceInterface";

interface WalletBalanceComponentProps{
  data: BalanceInterface;
  onPress: () => void;
}

const WalletBalanceComponent = ({
  data,
  onPress,
}: WalletBalanceComponentProps) => {
  return (
    <TouchableOpacity style={styles.maincontainer} onPress={onPress}>
      <StyledText
        children="Balance"
        variant="titleMedium"
        style={{
          marginBottom: 5,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <StyledText children={data.currency} variant="labelMedium" />
        <StyledText
          children={data.balance}
          variant="displayMedium"
          style={{ fontWeight: "bold" }}
        />
        <StyledText
          children={`Payout scheduled: ${data.date}`}
          variant="labelSmall"
          style={{
            marginTop: 10,
            fontFamily: "BarlowRegular",
            fontWeight: "400",
            fontSize: 14,
            color: "black",
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default WalletBalanceComponent;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: "rgba(244, 244, 244, 0.95)",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },
});
