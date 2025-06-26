import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LastDeliveryStatus } from "@/app/interfaces/Dashboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../helpers/others/StyledText";

interface LastTripComponentProps extends LastDeliveryStatus {
  onHelpPressed: () => void;
  onSeeEarningsActivity?: () => void;
}

const LastTripComponent = ({
  amount,
  currency,
  day,
  time,
  onHelpPressed,
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

            <Pressable
              onPress={() => {
                onHelpPressed?.();
                setIsExpanded(false);
              }}
            >
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

            <Pressable
              onPress={() => {
                onSeeEarningsActivity?.();
                setIsExpanded(false);
              }}
            >
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
    padding: 20,
    width: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  collapsedContainer: {
    padding: 0,
    backgroundColor: "transparent",
    height: "auto",
    minHeight: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  collapsedAmountPill: {
    backgroundColor: "black",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 50,
    minWidth: 140,
    alignItems: "center",
    alignSelf: "center",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  amountPill: {
    backgroundColor: "black",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 50,
    minWidth: 140,
    alignItems: "center",
  },
  amount: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  currencySymbol: {
    fontSize: 20,
    marginRight: 4,
  },
  hiddenAmount: {
    color: "white",
    fontSize: 24,
  },
  contentSection: {
    alignItems: "center",
    gap: 12,
  },
  lastTripText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  deliveryText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  seeEarningsText: {
    color: "#0066FF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    letterSpacing: 0.5,
  },
});
