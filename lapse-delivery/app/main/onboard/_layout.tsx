import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainOnboardLayout = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.headerContainer}>
        <Text>Lapse</Text>
        <Pressable style={styles.helpButton}>
          <Text>Help</Text>
        </Pressable>
      </View>
      <Stack>
        <Stack.Screen name="WhereToDeliver" options={{headerShown: false}} />
        <Stack.Screen name="DeliveryChoiceScreen" options={{headerShown: false}} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default MainOnboardLayout;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(4, 4, 4, 0.62)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },  
  helpButton:{
    backgroundColor: "rgba(28, 25, 196, 0.62)",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 4,
    shadowColor: "rgba(4, 4, 4, 0.62)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 4,
  },
});
