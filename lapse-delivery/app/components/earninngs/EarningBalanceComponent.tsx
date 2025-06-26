import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StyledText from "../helpers/others/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
interface EarningBalanceProps {
  balance: number;
  currency: string;
  date: string;
  onPress: () => void;
  onSummaryPress: () => void;
}

const EarningBalanceComponent = ({
  balance,
  currency,
  onPress,
  date,
  onSummaryPress,
}: EarningBalanceProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          gap: 8,
        }}
      >
        <StyledText children="Balance" variant="titleMedium" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <StyledText children={currency} variant="titleSmall" />
          <StyledText children={balance} variant="titleSmall" />
        </View>
        <StyledText
          children={`Payout scheduled for ${date}`}
          variant="titleSmall"
          style={{
            marginTop: 10,
            fontFamily: "BarlowRegular",
            fontWeight: "400",
            fontSize: 14,
            color: "black",
          }}
        />
      </View>
      <Pressable style={styles.summaryButton} onPress={onSummaryPress}>
        <StyledText children="Summary" variant="titleSmall" />
      </Pressable>
    </TouchableOpacity>
  );
};

export default EarningBalanceComponent;

const styles = StyleSheet.create({
  summaryButton: {

  },
});
