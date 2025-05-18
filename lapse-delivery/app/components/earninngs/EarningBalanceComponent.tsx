import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
interface EarningBalanceProps {
  balance: number;
  currency: string;
  onPress: () => void;
}

const EarningBalanceComponent = ({
  balance,
  currency,
  onPress,
}: EarningBalanceProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          gap: 8,
        }}
      >
        <StyledText children="Balance" variant="h5" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <StyledText children={currency} variant="h5" />
          <StyledText children={balance} variant="h5" />
        </View>
      </View>
    </Pressable>
  );
};

export default EarningBalanceComponent;

const styles = StyleSheet.create({});
