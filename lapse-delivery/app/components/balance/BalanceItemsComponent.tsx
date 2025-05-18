import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BalanceDataItem } from "@/app/interfaces/BalanceInterface";
import { router } from "expo-router";
import StyledText from "../helpers/others/StyledText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const BalanceItemsComponent = ({ item }: { item: BalanceDataItem }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: "#ccc",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <MaterialCommunityIcons
          name={
            item.type === "tips"
              ? "cash"
              : item.type === "delivery"
              ? "truck-delivery"
              : item.type === "withdraw"
              ? "bank"
              : item.type === "promotions"
              ? "star"
              : item.type === "referral"
              ? "bag-personal"
              : "arrow-left-right"
          }
          size={24}
          color="black"
        />
        <View style={{ gap: 5 }}>
          <StyledText
            variant="h4"
            children={item.type}
            style={{ fontSize: 14, fontWeight: "600" }}
          />
          <StyledText variant="h6" children={item.time} />
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <StyledText variant="h4" children={item.currency} />
        <StyledText variant="h4" children={item.amount} />
      </View>
    </View>
  );
};

export default BalanceItemsComponent;
