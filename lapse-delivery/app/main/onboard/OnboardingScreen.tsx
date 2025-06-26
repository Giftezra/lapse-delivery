import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { OnboardingCardInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import OnboardingCard from "@/app/components/onboarding/OnboardingCard";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { router, useLocalSearchParams } from "expo-router";
import { useOnboarding } from "@/app/contexts/OnboardingContext";

const OnboardingScreen = () => {
  const { vehicleType } = useLocalSearchParams<{ vehicleType: string }>();
  const { state, isStepCompleted } = useOnboarding();

  const getOnboardingSteps = (): OnboardingCardInterface[] => {
    const baseSteps: OnboardingCardInterface[] = [
      {
        title: "Personal Information",
        description: "Add your basic details and contact information",
        icon: "person-outline",
        completed: isStepCompleted("/main/onboard/PersonalInformationScreen"),
        route: "/main/onboard/PersonalInformationScreen",
      },
      {
        title: "Bank Details",
        description: "Add your bank account for payments",
        icon: "card-outline",
        completed: isStepCompleted("/main/onboard/BankInformationScreen"),
        route: "/main/onboard/BankInformationScreen",
      },
      {
        title: "Identity Verification",
        description: "Verify your identity with valid documents",
        icon: "shield-checkmark-outline",
        completed: isStepCompleted("/main/onboard/IdentityVerificationScreen"),
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
        completed: isStepCompleted("/main/onboard/VehicleInformationScreen"),
        route: "/main/onboard/VehicleInformationScreen",
      },
    ];
  };

  const handleContinue = () => {
    const steps = getOnboardingSteps();
    if (state.completedSteps.length === steps.length) {
      // All steps completed, proceed to final submission
      router.push("/main/onboard/submit" as any);
    } else {
      // Find the first incomplete step and navigate to it
      const nextStep = steps.find((step) => !isStepCompleted(step.route));
      if (nextStep) {
        router.push(nextStep.route as any);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          {state.completedSteps.length} of {getOnboardingSteps().length} steps
          completed
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {getOnboardingSteps().map((step, index) => (
          <OnboardingCard key={index} {...step} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <StyledButton
          title={
            state.completedSteps.length === getOnboardingSteps().length
              ? "Submit Application"
              : "Continue"
          }
          variant="primary"
          onPress={handleContinue}
        />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
});
