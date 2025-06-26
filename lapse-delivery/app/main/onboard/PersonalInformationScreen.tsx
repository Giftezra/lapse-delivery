import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import PersonalInfoForm from "@/app/components/onboarding/PersonalInfoForm";
import { useOnboarding } from "@/app/contexts/OnboardingContext";
import { router } from "expo-router";
import { PersonalInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";

/**
 * PersonalInformationScreen Component
 *
 * A two-step personal information form:
 * 1. Basic details (name, DOB, contact)
 * 2. Address information
 */
const PersonalInformationScreen = () => {
  const { completeStep, setPersonalInfo } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PersonalInfoInterface | null>(null);

  const handleSubmit = (data: PersonalInfoInterface) => {
    if (currentStep === 1) {
      setFormData(data);
      setCurrentStep(2);
    } else {
      setPersonalInfo(data);
      completeStep("/main/onboard/PersonalInformationScreen");
      router.back();
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (formData) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        handleSubmit(formData);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText style={styles.title}>
          {currentStep === 1 ? "Personal Details" : "Address Information"}
        </StyledText>
        <StyledText style={styles.subtitle}>
          {currentStep === 1
            ? "Please provide your basic information"
            : "Please provide your current address"}
        </StyledText>
      </View>

      <View style={styles.stepIndicator}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot, currentStep === 2 && styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.formContainer}>
        <PersonalInfoForm
          onSubmit={setFormData}
          currentStep={currentStep}
          initialData={formData || undefined}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Back"
            variant="secondary"
            onPress={handleBack}
            style={[styles.button, styles.backButton]}
          />
          <StyledButton
            title={currentStep === 1 ? "Next" : "Submit"}
            variant="primary"
            onPress={handleNext}
            style={[styles.button, styles.nextButton]}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2F4B",
  },
  header: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: "#4CD964",
  },
  formContainer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
  },
  backButton: {
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    backgroundColor: "#4169E1",
  },
});
