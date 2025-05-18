import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import WalletBalanceComponent from "@/app/components/wallet/WalletBalanceComponent";
import WeeklyPaymentComponent from "@/app/components/wallet/WeeklyPaymentComponent";
const WalletScreen = () => {
  return (
    <View>
      {/* Display the header to handle the back button if the router can go back */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        {router.canGoBack() && (
          <Pressable onPress={() => router.back()} style={{padding:5 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
        )}
        <StyledText children="Wallet" variant="h3" />
      </View>
      {/* Display the balance component */}
      <View style={styles.balanceContainer}>
        <WalletBalanceComponent balance={100} currency="$" date="May 17" />
      </View>
      {/* Payout Activity Container */}
      <TouchableOpacity
        style={styles.activityContainer}
        onPress={() => router.push("/main/screens/BalanceScreen")}
      >
        <StyledText children="Activity" variant="h3" />
        <StyledText
          children="view all"
          variant="h5"
          style={{ textTransform: "lowercase" }}
        />
      </TouchableOpacity>
      {/* Weekly Payout Activity Container */}
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <WeeklyPaymentComponent
          date="May 12 - May 18"
          payout={100}
          currency="$"
        />
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  balanceContainer: {
    marginHorizontal: 10,
    backgroundColor: "rgba(244, 244, 244, 0.95)",
    padding: 10,
    borderRadius: 10,
  },
  activityContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
