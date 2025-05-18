import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";

const WalletBalanceComponent = ({
  balance,
  currency,
  date,
}: {
  balance: number;
  currency: string;
  date: string;
}) => {
  return (
    <View style={styles.maincontainer}>
      <StyledText
        children="Balance"
        variant="h3"
        style={{
          marginBottom: 5,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <StyledText children={currency} variant="h5" />
        <StyledText children={balance} variant="h3" />
      </View>
      <StyledText
        children={`Payout scheduled: ${date}`}
        variant="h4"
        style={{
          marginTop: 10,
          fontFamily: "BarlowRegular",
          fontWeight: "400",
          fontSize: 14,
        }}
      />
    </View>
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
