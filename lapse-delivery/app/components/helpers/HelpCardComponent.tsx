import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "./others/StyledText";

interface HelpCardComponentProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const HelpCardComponent = ({
  title,
  icon,
  onPress,
}: HelpCardComponentProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.maincontainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.titlecontainer}>
        <StyledText
          children={title}
          variant="bodyMedium"
          style={{ textAlign: "center", fontWeight: "500" }}
          numberOfLines={2}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HelpCardComponent;

const styles = StyleSheet.create({
  maincontainer: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
  },
  titlecontainer: {
    width: "100%",
    paddingTop: 8,
    minHeight: 40,
    justifyContent: "center",
  },
});
