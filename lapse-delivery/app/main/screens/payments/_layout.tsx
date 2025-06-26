import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

const PaymentLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentScreen" />
    </Stack>
  )
}

export default PaymentLayout

const styles = StyleSheet.create({})