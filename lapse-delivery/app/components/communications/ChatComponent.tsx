import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChatInterface } from "@/app/interfaces/Communications";
import { Icon } from "react-native-paper";
import StyledText from "../helpers/others/StyledText";

interface ChatComponentProps {
  chat: ChatInterface;
  onPress: (id: string) => void;
}

const ChatComponent = ({ chat, onPress }: ChatComponentProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(chat.id)}
      style={styles.maincontainer}
    >
      <Icon source="message" size={20} color={"black"} />

      <View style={styles.rowsection}>
        <View style={styles.contentContainer}>
          <StyledText
            children={chat.place + "." + chat.date_created}
            variant="titleMedium"
          />
          <StyledText
            children={`Conversation ended on ${chat.date_updated}`}
            variant="bodyMedium"
          />
        </View>

        {chat.status === "active" && <View style={styles.statusIndicator} />}
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    gap: 20,
  },
  rowsection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#FF4444",
    borderRadius: 5,
    marginLeft: 10,
  },
});
