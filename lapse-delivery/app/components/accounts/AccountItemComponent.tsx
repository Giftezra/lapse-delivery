import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../helpers/others/StyledText";
import { router } from "expo-router";
const AccountItemComponent = ({
  vehicle,
  type,
}: {
  vehicle?: any;
  type?: string;
}) => {
  /* Get the title of the account item given the type passed */
  const getTitle = () => {
    switch (type) {
      case "vehicle":
        return "Vehicle";
      case "manage account":
        return "Manage Account";
      case "documents":
        return "Documents";
      case "payment":
        return "Payment";
      case "tax info":
        return "Tax Info";
      case "edit address":
        return "Edit Address";
      case "about":
        return "About";
      case "privacy":
        return "Privacy";
      case "app settings":
        return "App Settings";
      default:
        return "Account";
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(vehicle)}
      style={styles.maincontainer}
    >
      <MaterialCommunityIcons
        name={
          type === "vehicle"
            ? "car"
            : type === "manage account"
            ? "account"
            : type === "documents"
            ? "file-document"
            : type === "payment"
            ? "cash"
            : type === "tax info"
            ? "calculator"
            : type === "edit address"
            ? "map-marker"
            : type === "about"
            ? "information"
            : type === "privacy"
            ? "lock"
            : type === "app settings"
            ? "application-settings"
            : "ab-testing"
        }
        size={24}
        color="black"
      />
      <View style={{ gap: 5 }}>
        <StyledText children={getTitle()} variant="h3" />
        {vehicle && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons
              name={
                vehicle === "bicycle"
                  ? "bicycle"
                  : vehicle === "car"
                  ? "car"
                  : vehicle === "motorcycle" || vehicle === "scooter"
                  ? "motorbike"
                  : "truck"
              }
              size={15}
              color="black"
            />
            <StyledText children={vehicle} variant="h5" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AccountItemComponent;

const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 12,
    marginVertical: 10,
  },
});
