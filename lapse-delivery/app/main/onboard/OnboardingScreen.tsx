import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { OnboardingCardInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import OnboardingCard from "@/app/components/onboarding/OnboardingCard";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { router, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "@/app/components/helpers/others/StyledText";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/app/store/store";

const OnboardingScreen = () => {
  const { vehicleType } = useLocalSearchParams<{ vehicleType: string }>();
  const { completedSteps } = useAppSelector((state) => state.onboarding);

  /**
   * Manages the displays given the users vehicle types.
   * When a user sends a vehichle type from the params, use the params to get the vehivle type and then return the route-button types based on the vehicle type.
   *
   * @returns
   */
  const getOnboardingSteps = (): OnboardingCardInterface[] => {
    const baseSteps: OnboardingCardInterface[] = [
      {
        title: "Personal Information",
        description: "Add your basic details and contact information",
        icon: "person-outline",
        route: "/main/onboard/PersonalInformationScreen",
      },
      {
        title: "Bank Details",
        description: "Add your bank account for payments",
        icon: "card-outline",
        route: "/main/onboard/BankInformationScreen",
      },
      {
        title: "Identity Verification",
        description: "Verify your identity with valid documents",
        icon: "shield-checkmark-outline",
        route: "/main/onboard/IdentityVerificationScreen",
      },
    ];

    if (vehicleType === "bike") {
      return baseSteps;
    }

    return [
      ...baseSteps,
      {
        title: "Vehicle Information",
        description: "Add your vehicle details and documents",
        icon: "car-outline",
        route: "/main/onboard/VehicleInformationScreen",
      },
    ];
  };

  const handleContinue = () => {
    const steps = getOnboardingSteps();
    if (completedSteps.length === steps.length) {
      // All steps completed, proceed to final submission
      router.push("/main/onboard/submit" as any);
    } else {
      // Find the first incomplete step and navigate to it
      const nextStep = steps.find((step) => !completedSteps.includes(step.route));
      if (nextStep) {
        router.push(nextStep.route as any);
      }
    }
  };

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");
  const buttonColor = useThemeColor({}, "buttons");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <StyledText
          style={{}}
          children="Complete Your Profile"
          variant="titleMedium"
        />
        <StyledText
          style={{}}
          children={`${completedSteps.length} of ${
            getOnboardingSteps().length
          } steps completed`}
          variant="bodyMedium"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {getOnboardingSteps().map((step, index) => (
          <OnboardingCard key={index} {...step} completed={completedSteps.includes(step.route)}/>
        ))}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor }]}>
        <LinearGradient
          colors={[buttonColor, cardColor]}
          style={styles.button}
          start={{ x: 5, y: 20 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            onPress={handleContinue}
            style={{
              paddingVertical: 18,
              paddingHorizontal: 10,
            }}
          >
            <StyledText
              children={
                completedSteps.length === getOnboardingSteps().length
                  ? "Submit Application"
                  : "Continue"
              }
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  button: {
    maxWidth: 300,
    minWidth: 300,
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    alignSelf: "flex-end",
  },
});
