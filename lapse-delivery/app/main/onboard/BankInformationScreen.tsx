import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { BankInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import StyledInput from "@/app/components/helpers/inputs/StyledInput";
import {
  updateBankInfo,
  markStepAsCompleted,
} from "@/app/store/slices/OnboardingSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";

const BankInformationScreen = () => {
  const dispatch = useAppDispatch();
  const { bankInfo, personalInfo } = useAppSelector(
    (state) => state.onboarding
  );

  // Use the color theme
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");

  // Handle the form errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof BankInfoInterface, string>>
  >({});

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(
        markStepAsCompleted({ step: "/main/onboard/BankInformationScreen" })
      );
      router.push("/main/onboard/OnboardingScreen");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BankInfoInterface, string>> = {};

    if (!personalInfo?.first_name?.trim() || !personalInfo?.last_name?.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }
    if (!bankInfo?.accountNumber?.trim()) {
      newErrors.accountNumber = "Account number is required";
    }
    if (!bankInfo?.bankName?.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!bankInfo?.iban?.trim()) {
      newErrors.iban = "IBAN is required";
    } else if (bankInfo?.iban?.length <= 12) {
      newErrors.iban = "IBAN must be at least 12 digits";
    }
    // Ensure the iban is valid given the country
    if (personalInfo?.country === "United Kingdom") {
      // Ensure the iban starts with GB
      if (bankInfo?.iban?.slice(0, 2) !== "GB") {
        newErrors.iban = "IBAN must start with GB";
      }
    } else if (personalInfo?.country === "Ireland") {
      // Ensure the iban starts with IE
      if (bankInfo?.iban?.slice(0, 2) !== "IE") {
        newErrors.iban = "IBAN must start with IE";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { backgroundColor: cardColor, shadowColor: cardColor },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <StyledInput
            style={[
              styles.input,
              errors.accountHolderName && styles.inputError,
            ]}
            value={
              personalInfo?.first_name && personalInfo?.last_name
                ? personalInfo?.first_name + " " + personalInfo?.last_name
                : bankInfo?.accountHolderName
            }
            onChangeText={(value) =>
              dispatch(updateBankInfo({ field: "accountHolderName", value }))
            }
            label="Account Holder Name"
            placeholder="Enter account holder name"
            error={errors.accountHolderName}
            info="The account name must be the same as the users first and last name"
            editable={
              personalInfo?.first_name && personalInfo?.last_name !== undefined
                ? false
                : true
            }
          />
        </View>

        <View style={styles.formGroup}>
          <StyledInput
            style={[styles.input, errors.bankName && styles.inputError]}
            value={bankInfo?.bankName}
            onChangeText={(value) =>
              dispatch(updateBankInfo({ field: "bankName", value }))
            }
            label="Bank Name"
            placeholder="Enter bank name"
            error={errors.bankName}
          />
        </View>

        <View style={styles.formGroup}>
          <StyledInput
            style={[styles.input, errors.accountNumber && styles.inputError]}
            value={bankInfo?.accountNumber}
            onChangeText={(value) =>
              dispatch(updateBankInfo({ field: "accountNumber", value }))
            }
            label="Account Number"
            placeholder="Enter account number"
            keyboardType="numeric"
            maxLength={10}
            error={errors.accountNumber}
          />
        </View>

        <View style={styles.formGroup}>
          <StyledInput
            style={[styles.input, errors.iban && styles.inputError]}
            value={bankInfo?.iban}
            onChangeText={(value) =>
              dispatch(updateBankInfo({ field: "iban", value }))
            }
            label="IBAN"
            placeholder="IEXXXXXXXXXXXXXXXX"
            keyboardType="default"
            maxLength={22}
            error={errors.iban}
          />
        </View>

        <View style={styles.formGroup}>
          <StyledInput
            style={[styles.input, errors.bic && styles.inputError]}
            value={bankInfo?.bic}
            onChangeText={(value) =>
              dispatch(updateBankInfo({ field: "bic", value }))
            }
            label="BIC"
            placeholder="ABC890"
            error={errors.bic}
            maxLength={10}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Continue"
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default BankInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },
  contentContainer: {
    flexGrow: 1,
    gap: 20,
    height: "70%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add extra padding to ensure content doesn't get hidden behind the button
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFFFFF",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    height: 48,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  button: {
    maxWidth: 200,
  },
});
