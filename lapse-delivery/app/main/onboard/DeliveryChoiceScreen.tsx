import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { DeliveryOptionsChoicesInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { router } from "expo-router";
import DeliveryChoicesCard from "@/app/components/onboarding/DeliveryChoicesCard";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import StyledText from "@/app/components/helpers/others/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { updateVehicleInfo } from "@/app/store/slices/OnboardingSlice";

const deliveryOptions: DeliveryOptionsChoicesInterface[] = [
  {
    title: "Deliver with Lapse by bicycle",
    description: "Bicycle with valid food delivery insurance",
    age: 18,
    vehicle: "bicycle",
    onPress: () =>
      router.push({
        pathname: "/main/onboard/OnboardingScreen",
        params: { vehicleType: "bicycle" },
      } as any),
  },
  {
    title: "Deliver with Lapse by motorbike",
    description: "Scooter or motorbike with valid food delivery insurance",
    age: 18,
    vehicle: "motorcycle",
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
    vehicle: "car",
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
  const dispatch = useAppDispatch();
  const { vehicleInfo } = useAppSelector((state) => state.onboarding);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "buttons");
  const highlightColor = useThemeColor({}, "highlight");

  // Save the selected options to the user's profile
  const [selectedOptions, setSelectedOptions] =
    useState<DeliveryOptionsChoicesInterface>();

  const handleOptionSelect = (option: DeliveryOptionsChoicesInterface) => {
    setSelectedOptions(option);
    // Update the vehicle type in Redux store when selection is made
    dispatch(
      updateVehicleInfo({ field: "vehicleType", value: option.vehicle })
    );
  };

  const handleContinue = (event: any) => {
    if (selectedOptions?.onPress) {
      selectedOptions.onPress(event);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="car-sport" size={28} color={buttonColor} />
          </View>
          <View style={styles.headerText}>
            <StyledText
              style={[styles.title, { color: textColor }]}
              variant="headlineMedium"
            >
              Choose Your Vehicle
            </StyledText>
            <StyledText
              style={[styles.subtitle, { color: textColor }]}
              variant="bodyMedium"
            >
              Select your preferred delivery method
            </StyledText>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {deliveryOptions.map((option, index) => (
          <DeliveryChoicesCard
            key={index}
            {...option}
            selected={selectedOptions?.title === option.title}
            onPress={() => handleOptionSelect(option)}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={[buttonColor, highlightColor]}
          style={styles.button}
          start={{ x: 2, y: 2 }}
          end={{ x: 1, y: 3 }}
        >
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selectedOptions}
          >
            <StyledText
              style={{
                fontSize: 20,
                letterSpacing: 15,
                fontWeight: "700",
              }}
            >
              {selectedOptions ? "Continue" : "Select a vehicle"}
            </StyledText>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.skipContainer}>
          <StyledButton
            title="Skip to Dashboard"
            variant="secondary"
            onPress={() =>
              router.replace("/main/screens/DashboardScreen" as any)
            }
            style={styles.skipButton}
          />
        </View>
      </View>
    </View>
  );
};

export default DeliveryChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
  button: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    alignItems: "center",
  },
  skipContainer: {
    alignItems: "center",
  },
  skipButton: {
    height: 48,
    borderRadius: 12,
  },
});
