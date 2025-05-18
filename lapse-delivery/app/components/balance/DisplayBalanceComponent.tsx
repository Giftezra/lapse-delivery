import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface DisplayBalanceComponentProps {
  balance: number;
  currency: string;
}

const DisplayBalanceComponent = ({ balance, currency }: DisplayBalanceComponentProps) => {
  return (
    <View>
      <Text>DisplayBalanceComponent</Text>
    </View>
  )
}

export default DisplayBalanceComponent

const styles = StyleSheet.create({})