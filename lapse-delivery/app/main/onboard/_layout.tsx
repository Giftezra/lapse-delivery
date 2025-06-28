import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StyledText from "@/app/components/helpers/others/StyledText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AlertProvider } from "@/app/context/AlertContext";

const MainOnboardLayout = () => {
  const backgroundColor = useThemeColor({}, "background");
  const secondaryButtonColor = useThemeColor({}, "secondaryButtons");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "borders");

  return (
    <AlertProvider>
      <GestureHandlerRootView>
        <View style={[styles.headerContainer, { backgroundColor, borderColor}]}>
          <StyledText variant="titleLarge" children="Lapse" />
          <Pressable
            style={[
              styles.helpButton,
              { backgroundColor: secondaryButtonColor, },
            ]}
          >
            <StyledText variant="titleSmall" children="Help" style={{ color: textColor }} />
          </Pressable>
        </View>
        <View style={{ flex: 1, backgroundColor: "red" }}>
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
        </View>
      </GestureHandlerRootView>
    </AlertProvider>
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
    borderBottomWidth: 1,
  },
  helpButton: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
