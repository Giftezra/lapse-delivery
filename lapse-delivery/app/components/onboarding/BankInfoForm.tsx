import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { BankInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { Picker } from "@react-native-picker/picker";

interface BankInfoFormProps {
  onSubmit: (data: BankInfoInterface) => void;
  initialData?: BankInfoInterface;
}

const BankInfoForm = ({ onSubmit, initialData }: BankInfoFormProps) => {
  const [formData, setFormData] = useState<BankInfoInterface>(
    initialData || {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      routingNumber: "",
      accountType: "checking",
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof BankInfoInterface, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BankInfoInterface, string>> = {};

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!formData.routingNumber.trim()) {
      newErrors.routingNumber = "Routing number is required";
    } else if (formData.routingNumber.length !== 9) {
      newErrors.routingNumber = "Routing number must be 9 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BankInfoInterface, value: string) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={[styles.input, errors.accountHolderName && styles.inputError]}
          value={formData.accountHolderName}
          onChangeText={(value) =>
            handleInputChange("accountHolderName", value)
          }
          placeholder="Enter account holder name"
        />
        {errors.accountHolderName && (
          <Text style={styles.errorText}>{errors.accountHolderName}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={[styles.input, errors.bankName && styles.inputError]}
          value={formData.bankName}
          onChangeText={(value) => handleInputChange("bankName", value)}
          placeholder="Enter bank name"
        />
        {errors.bankName && (
          <Text style={styles.errorText}>{errors.bankName}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={[styles.input, errors.accountNumber && styles.inputError]}
          value={formData.accountNumber}
          onChangeText={(value) => handleInputChange("accountNumber", value)}
          placeholder="Enter account number"
          keyboardType="numeric"
          secureTextEntry
        />
        {errors.accountNumber && (
          <Text style={styles.errorText}>{errors.accountNumber}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Routing Number</Text>
        <TextInput
          style={[styles.input, errors.routingNumber && styles.inputError]}
          value={formData.routingNumber}
          onChangeText={(value) => handleInputChange("routingNumber", value)}
          placeholder="Enter 9-digit routing number"
          keyboardType="numeric"
          maxLength={9}
        />
        {errors.routingNumber && (
          <Text style={styles.errorText}>{errors.routingNumber}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Account Type</Text>
        <View
          style={[
            styles.pickerContainer,
            errors.accountType && styles.inputError,
          ]}
        >
          <Picker
            selectedValue={formData.accountType}
            onValueChange={(value) => handleInputChange("accountType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Checking" value="checking" />
            <Picker.Item label="Savings" value="savings" />
          </Picker>
        </View>
        {errors.accountType && (
          <Text style={styles.errorText}>{errors.accountType}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Save & Continue"
          variant="primary"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default BankInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
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
    marginTop: 24,
    marginBottom: 32,
  },
});
