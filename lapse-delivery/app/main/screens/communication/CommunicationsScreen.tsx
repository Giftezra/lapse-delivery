import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import StyledText from "@/app/components/helpers/others/StyledText";
import { FlatList } from "react-native-gesture-handler";
import NotificationInterface from "@/app/interfaces/Communications";
import NotificationComponent from "@/app/components/communications/NotificationComponent";
import ChatComponent from "@/app/components/communications/ChatComponent";
import { ChatInterface } from "@/app/interfaces/Communications";

const notifications: NotificationInterface[] = [
  {
    id: "1",
    title: "You have recieved a 1 euro tip",
    date: "10 minutes ago",
  },
  {
    id: "2",
    title:
      "Your identity documents are required before you deliver for the day",
    date: "1 hour ago",
  },
  {
    id: "3",
    title: "Lapse wirks best when you tell us what we are doing wrong",
    date: "2 days ago",
  },
];

const chats: ChatInterface[] = [
  {
    id: "1",
    place: "McDonalds",
    date_created: "2025-06-09",
    date_updated: "2025-06-10",
    status: "active",
  },
  {
    id: "2",
    place: "KFC",
    date_created: "2025-06-09",
    date_updated: "2025-06-10",
  },
  {
    id: "3",
    place: "Burger King",
    date_created: "2025-06-09",
    date_updated: "2025-06-10",
    status: "active",
  },
];

const CommunicationsScreen = () => {
  const [context, setContext] = React.useState<"notifications" | "support">(
    "notifications"
  );

  /** Render the notification component by passing using the item prop
   * @param {Object} item - The notification item to render.
   */
  const renderItem = ({
    item,
  }: {
    item: NotificationInterface | ChatInterface;
  }) => {
    return (
      <View style={styles.item}>
        {context === "notifications" ? (
          <NotificationComponent
            notification={item as NotificationInterface}
            onPress={() => {}}
          />
        ) : (
          <ChatComponent chat={item as ChatInterface} onPress={() => {}} />
        )}
      </View>
    );
  };

  // Get the data based on the current context
  const getData = () => {
    return context === "notifications" ? notifications : chats;
  };

  return (
    <View style={styles.maincontainer}>
      {/* Display the back button and the archieve box button */}
      <View style={styles.headersection}>
        {router.canGoBack() && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="archive" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Display the main content which will be in two parts split between the notifications and the support sections */}
      <View style={styles.mainsection}>
        <StyledText children="Inbox" variant="displaySmall" />
        {/* Display the toggle buttons */}
        <View style={styles.togglebuttonsection}>
          <TouchableOpacity
            onPress={() => setContext("notifications")}
            style={[
              styles.togglebutton,
              context === "notifications" && styles.togglebuttonactive,
            ]}
          >
            <StyledText children="Notifications" variant="titleMedium" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setContext("support")}
            style={[
              styles.togglebutton,
              context === "support" && styles.togglebuttonactive,
            ]}
          >
            <StyledText children="Support" variant="titleMedium" />
          </TouchableOpacity>
        </View>

        {/* Display the section */}
        <FlatList
          data={getData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default CommunicationsScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 5,
  },
  headersection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainsection: {
    flex: 1,
    padding: 5,
  },
  togglebuttonsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  togglebutton: {
    paddingBottom: 5,
    flex: 1,
    alignItems: "center",
  },
  togglebuttonactive: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  togglebuttoninactive: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});
