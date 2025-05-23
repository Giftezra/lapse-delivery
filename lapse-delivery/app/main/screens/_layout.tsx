import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const ScreensLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
        <Stack.Screen name="EarningScreen" options={{ headerShown: false }} />
        <Stack.Screen name="WalletScreen" options={{ headerShown: false }} />
        <Stack.Screen name="BalanceScreen" options={{ headerShown: false }} />
        <Stack.Screen name="accounts" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default ScreensLayout

const styles = StyleSheet.create({})