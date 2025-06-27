import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertProvider } from "../context/AlertContext";
import { Provider } from "react-redux";
import store from "@/app/store/store";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <AlertProvider>
        <SafeAreaView style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboard" options={{ headerShown: false }} />
            <Stack.Screen name="screens" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </AlertProvider>
    </Provider>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
