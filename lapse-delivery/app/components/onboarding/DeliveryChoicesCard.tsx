import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { DeliveryOptionsChoicesInterface } from "@/app/interfaces/Onboarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
const DeliveryChoicesCard = ({
  title,
  age,
  description,
  license,
  expierience,
  vehicle,
  onPress,
  selected,
}: DeliveryOptionsChoicesInterface) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.maincontainer, selected && styles.selectedContainer]}
    >
      {/* Delivery Badge */}
      <View style={styles.deliveryBadge}>
        <MaterialCommunityIcons
          name={
            vehicle === "Bike"
              ? "bike"
              : vehicle === "Car"
              ? "car"
              : "motorbike"
          }
          size={16}
          color="#0D7A3E"
        />
        <Text style={styles.deliveryText}>Delivery</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Title and Content */}
        <View style={styles.textContent}>
          <StyledText variant="h5" children={title} />
          <StyledText variant="body" children={`Age: ${age}+`} />

          {vehicle !== "Bike" && description && (
            <StyledText variant="body" children={`Vehicle: ${description}`} />
          )}

          {license && (
            <StyledText variant="body" children={`License: ${license}`} />
          )}
          {expierience && (
            <StyledText
              variant="body"
              children={`Driving Experience: ${expierience}`}
            />
          )}
        </View>

        {/* Vehicle Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={
              vehicle === "Bike"
                ? "bike"
                : vehicle === "Car"
                ? "car"
                : "motorbike"
            }
            size={40}
            color="#666"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryChoicesCard;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedContainer: {
    borderColor: "#0D7A3E",
    borderWidth: 2,
    backgroundColor: "#FAFFFE",
  },
  deliveryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5ED",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
    gap: 4,
  },
  deliveryText: {
    color: "#0D7A3E",
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContent: {
    flex: 1,
    marginRight: 16,
  },
  ageText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#000  ",
    marginBottom: 4,
  },

  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
