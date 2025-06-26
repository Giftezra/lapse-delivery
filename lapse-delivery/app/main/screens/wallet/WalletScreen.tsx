import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import WalletBalanceComponent from "@/app/components/wallet/WalletBalanceComponent";
import WeeklyPaymentComponent from "@/app/components/wallet/WeeklyPaymentComponent";
import { WeeklyTransactionInterface } from "@/app/interfaces/WalletInterface";
import BalanceInterface from "@/app/interfaces/BalanceInterface";

const balance: BalanceInterface = {
  balance: 50,
  currency: "$",
  date: "May 17",
};
const weeklyTransaction: WeeklyTransactionInterface = {
  initiated_date: "May 12 - May 18",
  amount: 100,
  currency: "$",
};

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
          <Pressable onPress={() => router.back()} style={{ padding: 5 }}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        )}
        <StyledText children="Wallet" variant="titleLarge" />
      </View>
      {/* Display the balance component */}
      <View style={styles.balanceContainer}>
        <WalletBalanceComponent
          data={balance}
          onPress={() => {
            router.push("/main/screens/wallet/BalanceScreen");
          }}
        />
      </View>
      {/* Payout Activity Container */}
      <TouchableOpacity
        style={styles.activityContainer}
        onPress={() => router.push("/main/screens/wallet/BalanceScreen")}
      >
        <StyledText children="Activity" variant="titleMedium" />
        <StyledText
          children="view all"
          variant="titleMedium"
          style={{ textTransform: "lowercase" }}
        />
      </TouchableOpacity>
      {/* Weekly Payout Activity Container */}
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <WeeklyPaymentComponent
          data={weeklyTransaction}
          onPress={() => {
            router.push("/main/screens/wallet/WeeklyPaymentScreen");
          }}
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
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
