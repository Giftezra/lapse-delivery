import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StyledText from "@/app/components/helpers/others/StyledText";
import { OnboardingProvider } from "@/app/contexts/OnboardingContext";

const MainOnboardLayout = () => {
  return (
    <OnboardingProvider>
      <GestureHandlerRootView>
        <View style={styles.headerContainer}>
          <StyledText variant="titleLarge">Lapse</StyledText>
          <Pressable style={styles.helpButton}>
            <StyledText variant="titleMedium">Help</StyledText>
          </Pressable>
        </View>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="WhereToDeliver"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeliveryChoiceScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalInformationScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BankInformationScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="IdentityVerificationScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VehicleInformationScreen"
            options={{ headerShown: false }}
          />
        </Stack>
      </GestureHandlerRootView>
    </OnboardingProvider>
  );
};

export default MainOnboardLayout;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  helpButton: {
    padding: 8,
  },
});
