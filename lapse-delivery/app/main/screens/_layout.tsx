import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";

const ScreensLayout = () => {
  const { width } = useWindowDimensions(); // Get the dimensions of the device
  /**
   * The system is designed for only devices after it the user is verified from the onboarding screen.
   * The component will return a view that will redirect the user to the app store or the play store depending on the device.
   */
  // if (width >= 640 || Platform.OS === "web") {
  //   return (
  //     <View>
  //       {/* Check the platform to display the button */}
  //       {Platform.OS === "ios" ? (
  //         <StyledButton
  //           title="Download on the App Store"
  //           variant="primary"
  //           onPress={() => Linking}
  //         />
  //       ) : (
  //         <StyledButton
  //           title="Download on the Play Store"
  //           variant="primary"
  //           onPress={() => Linking}
  //         />
  //       )}
  //     </View>
  //   );
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
        <Stack.Screen name="accounts" options={{ headerShown: false }} />
        <Stack.Screen name="communication" options={{ headerShown: false }} />
        <Stack.Screen name="earnings" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen name="mission" options={{ headerShown: false }} />
        <Stack.Screen name="payments" options={{ headerShown: false }} />
        <Stack.Screen name="referal" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default ScreensLayout;

const styles = StyleSheet.create({});
