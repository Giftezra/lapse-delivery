import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import { ScrollView } from "react-native-gesture-handler";
import AccountItemComponent from "@/app/components/accounts/AccountItemComponent";

const AccountScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);

  // Calculate opacity based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const accountTypes = [
    "vehicle",
    "manage account",
    "documents",
    "payment",
    "tax info",
    "edit address",
    "about",
    "privacy",
    "app settings",
  ];

  return (
    <View style={styles.maincontainer}>
      {router.canGoBack() && (
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.arrowbutton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
          <Animated.View style={{ opacity: headerOpacity }}>
            <StyledText children="Account" variant="h3" />
          </Animated.View>
        </View>
      )}
      {/* Display only when not scrolled. if scrolled hide the header */}
      {!isScrolled && (
        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          }}
        >
          <StyledText children="Account" variant="h1" />
        </Animated.View>
      )}
      <View style={styles.scrollViewcontainer}>
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: false,
              listener: ({
                nativeEvent,
              }: {
                nativeEvent: { contentOffset: { y: number } };
              }) => {
                setIsScrolled(nativeEvent.contentOffset.y > 0);
              },
            }
          )}
          scrollEventThrottle={16}
        >
          {accountTypes.map((type) => (
            <AccountItemComponent
              key={type}
              type={type}
              vehicle={type === "vehicle" ? "bicycle" : undefined}
            />
          ))}
          <View style={styles.logoutcontainer}>
            <Pressable>
              <StyledText children="switch account" variant="h5" />
            </Pressable>
            <Pressable>
              <StyledText children="Logout" variant="h5" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    padding: 5,
    flex: 1,
  },
  arrowbutton: {
    padding: 5,
    marginVertical: 10,
  },
  scrollViewcontainer: {
    flex: 1,
    padding: 5,
  },
  scrollView: {
    flex: 1,
    gap: 20,
  },
  logoutcontainer: {
    marginVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    padding: 10,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
