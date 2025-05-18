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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  collapsedContainer: {
    padding: 0,
    backgroundColor: "transparent",
    shadowColor: "transparent",
    elevation: 0,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountContainer: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
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
  amount: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  contentSection: {
    alignItems: "center",
    gap: 10,
  },
  today: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
  },
  trips: {
    fontSize: 24,
    color: "#000",
    marginBottom: 16,
  },
  summary: {
    color: "#4285F4",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});
