import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import StyledText from "@/app/components/helpers/others/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EarningsLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Display the help and back buttons */}
      <View
        style={[
          styles.rowSection,
          styles.staticHeader,
          {
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {router.canGoBack() && (
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="black"
              />
            </Pressable>
          )}
        </View>

        <Pressable style={[styles.helpButton]}>
          <MaterialCommunityIcons name="help-circle" size={24} color="black" />
          <StyledText children="Help" variant="labelMedium" />
        </Pressable>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EarningsScreen" options={{ headerShown: false }} />
        <Stack.Screen
          name="EarningDetailsScreen"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
};

export default EarningsLayout;

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  staticHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#333",
  },
});
