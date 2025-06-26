import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CommununicationLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CommunicationsScreen" options={{ headerShown: false }} />
    </Stack>
  )
}

export default CommununicationLayout

const styles = StyleSheet.create({})