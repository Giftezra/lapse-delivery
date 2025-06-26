import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { VehicleInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface VehicleInfoFormProps {
  onSubmit: (data: VehicleInfoInterface) => void;
  initialData?: VehicleInfoInterface;
  vehicleType: "motorcycle" | "car";
}

const VehicleInfoForm = ({
  onSubmit,
  initialData,
  vehicleType,
}: VehicleInfoFormProps) => {
  const [formData, setFormData] = useState<VehicleInfoInterface>(
    initialData || {
      vehicleType,
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      registrationNumber: "",
      insuranceNumber: "",
      insuranceProvider: "",
      insuranceExpiryDate: "",
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof VehicleInfoInterface, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VehicleInfoInterface, string>> = {};

    if (!formData.make?.trim()) {
      newErrors.make = "Make is required";
    }
    if (!formData.model?.trim()) {
      newErrors.model = "Model is required";
    }
    if (!formData.year?.trim()) {
      newErrors.year = "Year is required";
    }
    if (!formData.color?.trim()) {
      newErrors.color = "Color is required";
    }
    if (!formData.licensePlate?.trim()) {
      newErrors.licensePlate = "License plate is required";
    }
    if (!formData.registrationNumber?.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }
    if (!formData.insuranceNumber?.trim()) {
      newErrors.insuranceNumber = "Insurance number is required";
    }
    if (!formData.insuranceProvider?.trim()) {
      newErrors.insuranceProvider = "Insurance provider is required";
    }
    if (!formData.insuranceExpiryDate?.trim()) {
      newErrors.insuranceExpiryDate = "Insurance expiry date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof VehicleInfoInterface,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Make</Text>
        <TextInput
          style={[styles.input, errors.make && styles.inputError]}
          value={formData.make}
          onChangeText={(value) => handleInputChange("make", value)}
          placeholder={`Enter ${vehicleType} make`}
        />
        {errors.make && <Text style={styles.errorText}>{errors.make}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Model</Text>
        <TextInput
          style={[styles.input, errors.model && styles.inputError]}
          value={formData.model}
          onChangeText={(value) => handleInputChange("model", value)}
          placeholder={`Enter ${vehicleType} model`}
        />
        {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Year</Text>
        <TextInput
          style={[styles.input, errors.year && styles.inputError]}
          value={formData.year}
          onChangeText={(value) => handleInputChange("year", value)}
          placeholder="Enter year"
          keyboardType="numeric"
          maxLength={4}
        />
        {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Color</Text>
        <TextInput
          style={[styles.input, errors.color && styles.inputError]}
          value={formData.color}
          onChangeText={(value) => handleInputChange("color", value)}
          placeholder={`Enter ${vehicleType} color`}
        />
        {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>License Plate</Text>
        <TextInput
          style={[styles.input, errors.licensePlate && styles.inputError]}
          value={formData.licensePlate}
          onChangeText={(value) => handleInputChange("licensePlate", value)}
          placeholder="Enter license plate number"
          autoCapitalize="characters"
        />
        {errors.licensePlate && (
          <Text style={styles.errorText}>{errors.licensePlate}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Registration Number</Text>
        <TextInput
          style={[styles.input, errors.registrationNumber && styles.inputError]}
          value={formData.registrationNumber}
          onChangeText={(value) =>
            handleInputChange("registrationNumber", value)
          }
          placeholder="Enter registration number"
        />
        {errors.registrationNumber && (
          <Text style={styles.errorText}>{errors.registrationNumber}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Insurance Provider</Text>
        <TextInput
          style={[styles.input, errors.insuranceProvider && styles.inputError]}
          value={formData.insuranceProvider}
          onChangeText={(value) =>
            handleInputChange("insuranceProvider", value)
          }
          placeholder="Enter insurance provider"
        />
        {errors.insuranceProvider && (
          <Text style={styles.errorText}>{errors.insuranceProvider}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Insurance Number</Text>
        <TextInput
          style={[styles.input, errors.insuranceNumber && styles.inputError]}
          value={formData.insuranceNumber}
          onChangeText={(value) => handleInputChange("insuranceNumber", value)}
          placeholder="Enter insurance number"
        />
        {errors.insuranceNumber && (
          <Text style={styles.errorText}>{errors.insuranceNumber}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Insurance Expiry Date</Text>
        <TextInput
          style={[
            styles.input,
            errors.insuranceExpiryDate && styles.inputError,
          ]}
          value={formData.insuranceExpiryDate}
          onChangeText={(value) =>
            handleInputChange("insuranceExpiryDate", value)
          }
          placeholder="MM/DD/YYYY"
        />
        {errors.insuranceExpiryDate && (
          <Text style={styles.errorText}>{errors.insuranceExpiryDate}</Text>
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

export default VehicleInfoForm;

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
