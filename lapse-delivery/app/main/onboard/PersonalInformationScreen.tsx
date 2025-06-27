import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PersonalInfoForm from "@/app/components/onboarding/PersonalInfoForm";
import { router } from "expo-router";
import { PersonalInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  updatePersonalInfo,
  markStepAsCompleted,
} from "@/app/store/slices/OnboardingSlice";

/**
 * PersonalInformationScreen Component
 *
 * A two-step personal information form:
 * 1. Basic details (name, DOB, contact)
 * 2. Address information
 */
const PersonalInformationScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useAppDispatch();
  const { personalInfo, completedSteps } = useAppSelector(
    (state) => state.onboarding
  );

  // Add state for validation errors and DOB parts
  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalInfoInterface, string>>
  >({});
  const [dobParts, setDobParts] = useState({
    day: "",
    month: "",
    year: "",
  });

  // Initialize dobParts from existing personalInfo.dateOfBirth
  useEffect(() => {
    if (personalInfo?.dob) {
      const [year, month, day] = personalInfo.dob.split("-");
      setDobParts({
        day: day || "",
        month: month || "",
        year: year || "",
      });
    }
  }, [personalInfo?.dob]);

  // Helper function to check if a date is valid and user is 18+
  const isValidDateAndAge = (
    day: number,
    month: number,
    year: number
  ): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day); // month is 0-indexed in Date constructor

    // Check if the date is valid
    if (
      inputDate.getDate() !== day ||
      inputDate.getMonth() !== month - 1 ||
      inputDate.getFullYear() !== year
    ) {
      return false;
    }

    // Check if user is at least 18 years old
    const age = currentDate.getFullYear() - year;
    if (age < 18) return false;
    if (age === 18) {
      // Check if birthday has passed this year
      const birthdayThisYear = new Date(
        currentDate.getFullYear(),
        month - 1,
        day
      );
      if (currentDate < birthdayThisYear) return false;
    }

    return true;
  };

  /**
   * Validate individual steps for the personal information form to ensure they are all filled out correctly.
   * If any part of the form is not filled out, or invalid, the form will not be submitted,
   * and the user will get the error message for the part that is not filled out correctly.
   *
   * The method ensure that the user is over 18 years old given the date of birth they enter,
   * and the current date.
   * @returns
   */
  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoInterface, string>> = {};

    if (!personalInfo?.first_name?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!personalInfo?.last_name?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!dobParts.day || !dobParts.month || !dobParts.year) {
      newErrors.dateOfBirth = "Complete date of birth is required";
    } else {
      const day = parseInt(dobParts.day);
      const month = parseInt(dobParts.month);
      const year = parseInt(dobParts.year);

      if (day < 1 || day > 31) {
        newErrors.dateOfBirth = "Invalid day (must be 1-31)";
      }
      if (month < 1 || month > 12) {
        newErrors.dateOfBirth = "Invalid month (must be 1-12)";
      }
      if (year < 1900 || year > new Date().getFullYear()) {
        newErrors.dateOfBirth = "Invalid year";
      }

      // Check if date is valid and user is 18+
      if (!newErrors.dateOfBirth && !isValidDateAndAge(day, month, year)) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }
    if (!personalInfo?.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!personalInfo?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(personalInfo?.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoInterface, string>> = {};

    if (!personalInfo?.address?.trim()) {
      newErrors.address = "Address is required";
    }
    if (!personalInfo?.city?.trim()) {
      newErrors.city = "City is required";
    }
    if (!personalInfo?.state?.trim()) {
      newErrors.state = "State is required";
    }
    if (!personalInfo?.zipCode?.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      if (validateStep2()) {
        dispatch(
          markStepAsCompleted({
            step: "/main/onboard/PersonalInformationScreen",
          })
        );
      }
    } else {
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
    if (personalInfo) {
      const isValid = currentStep === 1 ? validateStep1() : validateStep2();
      dispatch(
        markStepAsCompleted({ step: "/main/onboard/PersonalInformationScreen" })
      );
      if (isValid) {
        if (currentStep === 1) {
          // Format date of birth before proceeding
          const dateOfBirth = `${dobParts.year}-${dobParts.month.padStart(
            2,
            "0"
          )}-${dobParts.day.padStart(2, "0")}`;
          dispatch(
            updatePersonalInfo({ field: "dateOfBirth", value: dateOfBirth })
          );
          setCurrentStep(2);
        } else {
          handleSubmit();
        }
      }
    }
  };

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <StyledText
          style={{}}
          children={
            currentStep === 1 ? "Personal Details" : "Address Information"
          }
          variant="titleLarge"
        />
        <StyledText
          style={{}}
          children={
            currentStep === 1
              ? "Please provide your basic information"
              : "Please provide your current address"
          }
          variant="bodyMedium"
        />
      </View>

      <View style={styles.stepIndicator}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot, currentStep === 2 && styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.formContainer}>
        <PersonalInfoForm
          currentStep={currentStep}
          errors={errors}
          dobParts={dobParts}
          setDobParts={setDobParts}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Back"
            variant="secondary"
            onPress={handleBack}
            style={[styles.button]}
          />
          <StyledButton
            title={currentStep === 1 ? "Next" : "Submit"}
            variant="primary"
            onPress={currentStep === 1 ? handleNext : handleSubmit}
            style={[styles.button]}
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
    paddingVertical: 10,
    flex: 1,
  },
});
