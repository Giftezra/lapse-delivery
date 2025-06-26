import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const WalletLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WalletScreen' options={{ headerShown: false }} />
        <Stack.Screen name='WeeklyPaymentScreen' options={{ headerShown: false }} />
    </Stack>
  )
}

export default WalletLayout

const styles = StyleSheet.create({})