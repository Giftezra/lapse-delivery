import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NotificationInterface from "@/app/interfaces/Communications";
import StyledText from "../helpers/others/StyledText";

interface NotificationComponentProps {
  notification: NotificationInterface;
  onPress: (id: string) => void;
}

const NotificationComponent = ({
  notification,
  onPress,
}: NotificationComponentProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(notification.id)}
      style={styles.maincontainer}
    >
      <View style={styles.titlecontainer}>
        <StyledText children={notification.title} variant="titleMedium" />
      </View>
      <View style={styles.datecontainer}>
        <StyledText children={notification.date} variant="bodyMedium" />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  titlecontainer: {
    flex: 1,
    padding: 5,
  },
  datecontainer: {
    padding: 5,
  },
});
