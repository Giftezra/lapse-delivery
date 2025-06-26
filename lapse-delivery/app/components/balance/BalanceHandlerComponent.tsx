import { Pressable, StyleSheet, View, Animated } from "react-native";
import React from "react";
import { router } from "expo-router";
import StyledText from "../helpers/others/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BalanceItemsComponentProps {
  balance: number;
  currency: string;
  canGoBack: boolean;
  isScrolled: Animated.AnimatedInterpolation<number>;
}

const BalanceHandlerComponent = ({
  balance,
  currency,
  canGoBack,
  isScrolled,
}: BalanceItemsComponentProps) => {
  return (
    <View style={styles.balancecontainer}>
      <View style={styles.headerContainer}>
        {canGoBack && (
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
        )}

        {/* Title that shows when not scrolled */}
        <Animated.View
          style={{
            opacity: isScrolled.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <StyledText
            variant="labelMedium"
            children="Balance"
            style={{ fontSize: 16, fontWeight: "600" }}
          />
        </Animated.View>

        {/* Amount that shows when scrolled */}
        <Animated.View
          style={{
            opacity: isScrolled,
            position: "absolute",
            left: canGoBack ? 44 : 0, // Account for back button width
          }}
        >
          <StyledText
            variant="labelMedium"
            children={`${currency}${balance.toFixed(2)}`}
            style={{ fontSize: 16, fontWeight: "600" }}
          />
        </Animated.View>
      </View>

      {/* Large balance display */}
      <Animated.View
        style={[
          styles.rowsection,
          {
            opacity: isScrolled.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <StyledText variant="titleLarge" children={currency} />
        <StyledText variant="titleMedium" children={balance.toFixed(2)} />
      </Animated.View>
    </View>
  );
};

export default BalanceHandlerComponent;

const styles = StyleSheet.create({
  balancecontainer: {
    padding: 10,
    backgroundColor: "#999999",
    height: 200,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 15,
    height: 40,
  },
  rowsection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
});
