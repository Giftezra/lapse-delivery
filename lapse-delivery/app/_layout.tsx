import { Stack } from "expo-router";
import { Dimensions, View, Text, Platform, StyleSheet } from "react-native";
import LocalizationProvider from "./context/LocalizationProvider";
import ThemeProvider from "./context/ThemeProvider";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const width = Dimensions.get("window").width;
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <PaperProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="main" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </LocalizationProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    maxWidth: 400,
  },
});
