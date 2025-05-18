import { Stack } from "expo-router";
import { Dimensions, View, Text, Platform, StyleSheet } from "react-native";
import LocalizationProvider from "./context/LocalizationProvider";
import ThemeProvider from "./context/ThemeProvider";

export default function RootLayout() {
  const width = Dimensions.get("window").width;
  if (width <= 764 && Platform.OS !== "web") {
    return (
      <ThemeProvider>
        <LocalizationProvider>
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="main" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Mobile Only Application</Text>
          <Text style={styles.message}>
          This application is designed for mobile devices only. Please access it
            using your smartphone.
          </Text>
        </View>
      </ThemeProvider>
    );
  }
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
