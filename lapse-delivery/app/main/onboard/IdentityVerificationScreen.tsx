import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import IdentityInfoForm from "@/app/components/onboarding/IdentityInfoForm";
import { useOnboarding } from "@/app/contexts/OnboardingContext";
import { router } from "expo-router";
import { IdentityInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";

/**
 * IdentityVerificationScreen Component
 *
 * A two-step identity verification process where users can:
 * 1. Select their ID type (Step 1)
 * 2. Upload document photos and take a selfie (Step 2)
 */
const IdentityVerificationScreen = () => {
  // Context and state management
  const { completeStep, setDocument } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IdentityInfoInterface | null>(null);

  /**
   * Handles the form submission for each step
   * Step 1: Stores the form data and moves to next step
   * Step 2: Completes the verification process
   */
  const handleSubmit = (data: IdentityInfoInterface) => {
    if (currentStep === 1) {
      setFormData(data);
      setCurrentStep(2);
    } else {
      // Process document uploads
      if (data.frontImage) {
        setDocument("idFront", { uri: data.frontImage, type: "image" });
      }
      if (data.backImage) {
        setDocument("idBack", { uri: data.backImage, type: "image" });
      }
      if (data.selfieImage) {
        setDocument("selfie", { uri: data.selfieImage, type: "image" });
      }
      completeStep("/main/onboard/IdentityVerificationScreen");
      router.back();
    }
  };

  /**
   * Handles navigation between steps
   * Prevents data loss when going back
   */
  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <StyledText style={styles.title}>
          {currentStep === 1 ? "Verify Your Identity!" : "Proof of Identity"}
        </StyledText>
        <StyledText style={styles.subtitle}>
          {currentStep === 1
            ? "Please complete the verification process to continue with your registration"
            : "Please upload a copy of your identity with a clear selfie photo to proof the document holder"}
        </StyledText>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot, currentStep === 2 && styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <IdentityInfoForm
          onSubmit={handleSubmit}
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
            onPress={() => {
              if (formData) {
                handleSubmit(formData);
              }
            }}
            style={[styles.button, styles.nextButton]}
          />
        </View>
      </View>
    </View>
  );
};

export default IdentityVerificationScreen;

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
