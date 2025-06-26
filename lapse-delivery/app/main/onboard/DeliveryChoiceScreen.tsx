import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DeliveryOptionsChoicesInterface } from "@/app/interfaces/Onboarding";
import { router } from "expo-router";
import DeliveryChoicesCard from "@/app/components/onboarding/DeliveryChoicesCard";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";

const deliveryOptions: DeliveryOptionsChoicesInterface[] = [
  {
    title: "Deliver with Lapse by bicycle",
    description: "Bicycle with valid food delivery insurance",
    age: 18,
    vehicle: "Bike",
    onPress: () =>
      router.push({
        pathname: "/main/onboard/OnboardingScreen",
        params: { vehicleType: "bike" },
      } as any),
  },
  {
    title: "Deliver with Lapse by motorbike",
    description: "Scooter or motorbike with valid food delivery insurance",
    age: 18,
    vehicle: "Motorcycle",
    license: "Valid food delivery license",
    expierience: "1 year",
    onPress: () =>
      router.push({
        pathname: "/main/onboard/OnboardingScreen",
        params: { vehicleType: "motorcycle" },
      } as any),
  },
  {
    title: "Deliver with Lapse by car",
    description: "Car with valid food delivery insurance",
    age: 18,
    vehicle: "Car",
    license: "Valid food delivery license and driver's license",
    expierience: "1 year",
    onPress: () =>
      router.push({
        pathname: "/main/onboard/OnboardingScreen",
        params: { vehicleType: "car" },
      } as any),
  },
];

const DeliveryChoiceScreen = () => {
  // Save the selected options to the user's profile
  const [selectedOptions, setSelectedOptions] =
    useState<DeliveryOptionsChoicesInterface>();

  const handleContinue = (event: any) => {
    if (selectedOptions?.onPress) {
      selectedOptions.onPress(event);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {deliveryOptions.map((option, index) => (
          <View key={index} style={styles.itemWrapper}>
            <DeliveryChoicesCard
              {...option}
              selected={selectedOptions?.title === option.title}
              onPress={() => setSelectedOptions(option)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Continue"
          variant="primary"
          onPress={handleContinue}
          disabled={!selectedOptions}
        />
      </View>
      <View>
        <StyledButton
          title="Dashboard"
          variant="secondary"
          onPress={() => router.replace("/main/screens/DashboardScreen" as any)}
        />
      </View>
    </View>
  );
};

export default DeliveryChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  requestRide: {
    textAlign: "center",
    color: "#666",
    textDecorationLine: "underline",
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  itemWrapper: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
