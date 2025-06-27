import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import IdentityInfoForm from "@/app/components/onboarding/IdentityInfoForm";
import { router } from "expo-router";
import { IdentityInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { markStepAsCompleted } from "@/app/store/slices/OnboardingSlice";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * IdentityVerificationScreen Component
 *
 * A two-step identity verification process where users can:
 * 1. Select their ID type (Step 1)
 * 2. Upload document photos and take a selfie (Step 2)
 */
const IdentityVerificationScreen = () => {
  const dispatch = useAppDispatch();
  const { identityInfo } = useAppSelector((state) => state.onboarding);

  // Import the colors themes
  const backgroundColor = useThemeColor({}, "background");
  // Context and state management
  const [currentStep, setCurrentStep] = useState(1);

  /**
   * Handles the form submission for each step
   * Step 1: Stores the form data and moves to next step
   * Step 2: Completes the verification process
   */
  const handleSubmit = (data?: IdentityInfoInterface) => {
    if (currentStep === 1) {
      // Step 1: ID type selection - automatically proceed to step 2
      setCurrentStep(2);
    } else {
      // Step 2: Document uploads - mark as completed and navigate back
      if (
        identityInfo?.frontImage &&
        identityInfo?.backImage &&
        identityInfo?.selfieImage
      ) {
        dispatch(
          markStepAsCompleted({
            step: "/main/onboard/IdentityVerificationScreen",
          })
        );
        router.back();
      }
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
    <View style={[styles.container, { backgroundColor }]}>
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
          initialData={identityInfo || undefined}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Back"
            onPress={handleBack}
            style={[styles.button]}
          />
          <StyledButton
            title={currentStep === 1 ? "Next" : "Submit"}
            onPress={() => {
              if (currentStep === 1 && identityInfo?.idType) {
                handleSubmit();
              } else if (
                currentStep === 2 &&
                identityInfo?.frontImage &&
                identityInfo?.backImage &&
                identityInfo?.selfieImage
              ) {
                handleSubmit();
              }
            }}
            style={[styles.button]}
            disabled={
              currentStep === 1
                ? !identityInfo?.idType
                : !(
                    identityInfo?.frontImage &&
                    identityInfo?.backImage &&
                    identityInfo?.selfieImage
                  )
            }
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
  },
});
