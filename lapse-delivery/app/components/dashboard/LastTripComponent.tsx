import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LastDeliveryStatus } from "@/app/interfaces/Dashboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../helpers/others/StyledText";

interface LastTripComponentProps extends LastDeliveryStatus {
  onHidePressed: () => void;
  onSeeEarningsActivity?: () => void;
}

const LastTripComponent = ({
  amount,
  currency,
  day,
  time,
  onHidePressed,
  onSeeEarningsActivity,
}: LastTripComponentProps) => {
  const [isHidePressed, setIsHidePressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable
      style={[styles.mainContainer, !isExpanded && styles.collapsedContainer]}
    >
      {isExpanded ? (
        <>
          <View style={styles.topSection}>
            <Pressable onPress={() => setIsHidePressed(!isHidePressed)}>
              <MaterialCommunityIcons name="eye" size={24} color="black" />
            </Pressable>

            <Pressable style={styles.amountPill} onPress={handlePress}>
              {isHidePressed ? (
                <Text style={styles.hiddenAmount}>****</Text>
              ) : (
                <Text style={styles.amount}>
                  <Text style={styles.currencySymbol}>{currency}</Text>
                  {amount}
                </Text>
              )}
            </Pressable>

            <Pressable>
              <MaterialCommunityIcons
                name="help-circle"
                size={24}
                color="black"
              />
            </Pressable>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.lastTripText}>LAST TRIP</Text>

            <Text style={styles.dateText}>
              {day} at {time}
            </Text>

            <Text style={styles.deliveryText}>Delivery</Text>

            <Pressable onPress={onSeeEarningsActivity}>
              <Text style={styles.seeEarningsText}>SEE EARNINGS ACTIVITY</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Pressable style={styles.collapsedAmountPill} onPress={handlePress}>
          <Text style={styles.amount}>
            <Text style={styles.currencySymbol}>{currency}</Text>
            {amount}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default LastTripComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "100%",
  },
  collapsedContainer: {
    padding: 0,
    backgroundColor: "transparent",
  },
  collapsedAmountPill: {
    marginTop: 10,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    minWidth: 120,
    alignItems: "center",
    alignSelf: "center",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountPill: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    minWidth: 120,
    alignItems: "center",
  },
  amount: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  currencySymbol: {
    fontSize: 20,
    marginRight: 2,
  },
  hiddenAmount: {
    color: "white",
    fontSize: 24,
  },
  contentSection: {
    alignItems: "center",
    gap: 10,
  },
  lastTripText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
  },
  deliveryText: {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
  },
  seeEarningsText: {
    color: "#0066FF",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});
