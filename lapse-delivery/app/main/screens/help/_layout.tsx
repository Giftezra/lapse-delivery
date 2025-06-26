import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HelpLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="HelpScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HelpLayout;

const styles = StyleSheet.create({});
