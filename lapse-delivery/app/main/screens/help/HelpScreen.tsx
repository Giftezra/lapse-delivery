import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "@/app/components/helpers/others/StyledText";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-paper";
import HelpCardComponent from "@/app/components/helpers/HelpCardComponent";
import { useSharedValue } from "react-native-reanimated";

const helpCards = [
  {
    title: "My Trips",
    icon: (
      <MaterialCommunityIcons
        name="map-marker-path"
        size={40}
        color="#2196F3"
      />
    ),
    onPress: () => {},
  },
  {
    title: "Account",
    icon: (
      <MaterialCommunityIcons name="account-circle" size={40} color="#4CAF50" />
    ),
    onPress: () => {},
  },
  {
    title: "Earnings",
    icon: <MaterialCommunityIcons name="wallet" size={40} color="#FFC107" />,
    onPress: () => {},
  },
  {
    title: "EVs",
    icon: (
      <MaterialCommunityIcons name="car-electric" size={40} color="#00BCD4" />
    ),
    onPress: () => {},
  },
  {
    title: "Guides",
    icon: (
      <MaterialCommunityIcons
        name="book-open-variant"
        size={40}
        color="#9C27B0"
      />
    ),
    onPress: () => {},
  },
  {
    title: "Item Delivery",
    icon: (
      <MaterialCommunityIcons
        name="package-variant"
        size={40}
        color="#FF5722"
      />
    ),
    onPress: () => {},
  },
  {
    title: "Safety",
    icon: (
      <MaterialCommunityIcons name="shield-check" size={40} color="#F44336" />
    ),
    onPress: () => {},
  },
  {
    title: "Accessibility",
    icon: (
      <MaterialCommunityIcons
        name="human-wheelchair"
        size={40}
        color="#3F51B5"
      />
    ),
    onPress: () => {},
  },
  {
    title: "Legal",
    icon: <MaterialCommunityIcons name="gavel" size={40} color="#795548" />,
    onPress: () => {},
  },
  {
    title: "Privacy",
    icon: <MaterialCommunityIcons name="lock" size={40} color="#607D8B" />,
    onPress: () => {},
  },
  {
    title: "Diagnostics",
    icon: <MaterialCommunityIcons name="tools" size={40} color="#FF9800" />,
    onPress: () => {},
  },
  {
    title: "Map Issues",
    icon: (
      <MaterialCommunityIcons
        name="map-marker-alert"
        size={40}
        color="#E91E63"
      />
    ),
    onPress: () => {},
  },
];

const HelpScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = React.useState(false);

  const headerTranslateX = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const scrollHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.ScrollView style={styles.maincontainer}>
      {/* Top Heading */}
      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          {router.canGoBack() && (
            <Pressable onPress={() => router.back()} style={{ padding: 5 }}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          )}
          <StyledText
            children={isScrolling ? "Help" : ""}
            variant="titleMedium"
            style={{ textTransform: "capitalize", fontWeight: "500" }}
          />
        </View>

        <Pressable
          style={styles.heading}
          onPress={() =>
            router.push("/main/screens/communication/CommunicationsScreen")
          }
        >
          <MaterialCommunityIcons name="inbox" size={24} color="black" />
          <StyledText
            children="communications"
            variant="titleMedium"
            style={{ textTransform: "capitalize", fontWeight: "500" }}
          />
        </Pressable>
      </View>

      {/* Display help cards */}
      <View style={styles.mainsection}>
        <StyledText
          children={isScrolling ? "" : "Help Center"}
          variant="titleMedium"
          style={{ fontWeight: "500", paddingHorizontal: 10, marginBottom: 10 }}
        />
        <View style={styles.helpCardContainer}>
          {helpCards.map((card, index) => (
            <View key={index} style={styles.helpcarditem}>
              <HelpCardComponent
                title={card.title}
                icon={card.icon}
                onPress={card.onPress}
              />
            </View>
          ))}
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  mainsection: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  helpCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  helpcarditem: {
    width: "32%",
    marginBottom: 12,
  },
});
