import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TodaysComponentProps {
  amount: number;
  currency: string;
  trips: number;
  onSeeWeeklySummary?: () => void;
}

const TodaysComponent = ({
  amount,
  currency,
  trips,
  onSeeWeeklySummary,
}: TodaysComponentProps) => {
  const [isHidePressed, setIsHidePressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable
      style={[styles.container, !isExpanded && styles.collapsedContainer]}
    >
      {isExpanded ? (
        <>
          <View style={styles.topSection}>
            <Pressable onPress={() => setIsHidePressed(!isHidePressed)}>
              <MaterialCommunityIcons name="eye" size={24} color="black" />
            </Pressable>

            <Pressable style={styles.amountContainer} onPress={handlePress}>
              {isHidePressed ? (
                <Text style={styles.amount}>****</Text>
              ) : (
                <Text style={styles.amount}>
                  {currency}
                  {amount.toFixed(2)}
                </Text>
              )}
            </Pressable>

            <Pressable disabled={true}>
              <MaterialCommunityIcons
                name="help-circle"
                size={24}
                color="white"
              />
            </Pressable>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.today}>TODAY</Text>

            <Text style={styles.trips}>
              {trips} {trips === 1 ? "trip" : "trips"} completed
            </Text>

            <Pressable onPress={onSeeWeeklySummary}>
              <Text style={styles.summary}>SEE WEEKLY SUMMARY</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Pressable style={styles.collapsedAmountPill} onPress={handlePress}>
          <Text style={styles.amount}>
            {currency}
            {amount.toFixed(2)}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default TodaysComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  amountContainer: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    minWidth: 140,
    alignItems: "center",
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
  amount: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  contentSection: {
    alignItems: "center",
    gap: 12,
  },
  today: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  trips: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
    textAlign: "center",
  },
  summary: {
    color: "#0066FF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    letterSpacing: 0.5,
  },
});
