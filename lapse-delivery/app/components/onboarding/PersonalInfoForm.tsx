import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { PersonalInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { router } from "expo-router";
import StyledTextInput from "../helpers/others/StyledTextInput";
import StyledText from "../helpers/others/StyledText";
import StyledInput from "../helpers/inputs/StyledInput";

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoInterface) => void;
  initialData?: PersonalInfoInterface;
  currentStep: number;
}

const PersonalInfoForm = ({
  onSubmit,
  initialData,
  currentStep,
}: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfoInterface>(
    initialData || {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }
  );

  const [dobParts, setDobParts] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalInfoInterface, string>>
  >({});

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoInterface, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!dobParts.day || !dobParts.month || !dobParts.year) {
      newErrors.dateOfBirth = "Complete date of birth is required";
    } else {
      const day = parseInt(dobParts.day);
      const month = parseInt(dobParts.month);
      const year = parseInt(dobParts.year);

      if (day < 1 || day > 31) {
        newErrors.dateOfBirth = "Invalid day";
      }
      if (month < 1 || month > 12) {
        newErrors.dateOfBirth = "Invalid month";
      }
      if (year < 1900 || year > new Date().getFullYear()) {
        newErrors.dateOfBirth = "Invalid year";
      }
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoInterface, string>> = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = currentStep === 1 ? validateStep1() : validateStep2();
    if (isValid) {
      if (currentStep === 1) {
        const dateOfBirth = `${dobParts.month}/${dobParts.day}/${dobParts.year}`;
        onSubmit({ ...formData, dateOfBirth });
      } else {
        onSubmit(formData);
      }
    }
  };

  const handleInputChange = (
    field: keyof PersonalInfoInterface,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDOBChange = (part: "day" | "month" | "year", value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");

    // Enforce length limits
    let limitedValue = numericValue;
    if (part === "day" || part === "month") {
      limitedValue = numericValue.slice(0, 2);
    } else if (part === "year") {
      limitedValue = numericValue.slice(0, 4);
    }

    setDobParts((prev) => ({
      ...prev,
      [part]: limitedValue,
    }));

    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "",
      }));
    }
  };

  const renderStep1 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formGroup}>
        <StyledInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
          error={errors.firstName}
          info="Please enter your first name as it appears on your ID"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
          error={errors.lastName}
          info="Please enter your last name as it appears on your ID"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText style={styles.label}>Date of Birth</StyledText>
        <View style={styles.dobContainer}>
          <View style={styles.dobInputContainer}>
            <TextInput
              style={styles.dobInput}
              value={dobParts.day}
              onChangeText={(value) => handleDOBChange("day", value)}
              placeholder="DD"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <StyledText style={styles.dobSeparator}>/</StyledText>
          <View style={styles.dobInputContainer}>
            <TextInput
              style={styles.dobInput}
              value={dobParts.month}
              onChangeText={(value) => handleDOBChange("month", value)}
              placeholder="MM"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <StyledText style={styles.dobSeparator}>/</StyledText>
          <View style={styles.dobInputContainer}>
            <TextInput
              style={styles.dobInput}
              value={dobParts.year}
              onChangeText={(value) => handleDOBChange("year", value)}
              placeholder="YYYY"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </View>
        {errors.dateOfBirth && (
          <StyledText style={styles.errorText}>{errors.dateOfBirth}</StyledText>
        )}
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(value) => handleInputChange("phoneNumber", value)}
          keyboardType="phone-pad"
          error={errors.phoneNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formGroup}>
        <StyledInput
          label="Street Address"
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
          error={errors.address}
          placeholder="Enter your street address"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="City"
          value={formData.city}
          onChangeText={(value) => handleInputChange("city", value)}
          error={errors.city}
          placeholder="Enter your city"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="State"
          value={formData.state}
          onChangeText={(value) => handleInputChange("state", value)}
          error={errors.state}
          placeholder="Enter your state"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="ZIP Code"
          value={formData.zipCode}
          onChangeText={(value) => handleInputChange("zipCode", value)}
          keyboardType="number-pad"
          error={errors.zipCode}
          placeholder="Enter your ZIP code"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>
    </ScrollView>
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // Split date of birth if it exists
      if (initialData.dateOfBirth) {
        const [month, day, year] = initialData.dateOfBirth.split("/");
        setDobParts({ day, month, year });
      }
    }
  }, [initialData]);

  return currentStep === 1 ? renderStep1() : renderStep2();
};

export default PersonalInfoForm;

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dobInputContainer: {
    flex: 1,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
  },
  dobInput: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  dobSeparator: {
    color: "#FFFFFF",
    fontSize: 20,
    marginHorizontal: 8,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
});
