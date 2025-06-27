import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { PersonalInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "../helpers/others/StyledText";
import StyledInput from "../helpers/inputs/StyledInput";
import { useAppSelector, useAppDispatch } from "@/app/store/store";
import { updatePersonalInfo } from "@/app/store/slices/OnboardingSlice";

interface PersonalInfoFormProps {
  currentStep: number;
  errors?: Partial<Record<keyof PersonalInfoInterface, string>>;
  dobParts?: {
    day: string;
    month: string;
    year: string;
  };
  setDobParts?: React.Dispatch<
    React.SetStateAction<{
      day: string;
      month: string;
      year: string;
    }>
  >;
}

const PersonalInfoForm = ({
  currentStep,
  errors = {},
  dobParts = { day: "", month: "", year: "" },
  setDobParts,
}: PersonalInfoFormProps) => {
  const { personalInfo } = useAppSelector((state) => state.onboarding);
  const dispatch = useAppDispatch();

  const handleDOBChange = (part: "day" | "month" | "year", value: string) => {
    if (!setDobParts) return;

    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, "");

    let newValue = numericValue;

    // Apply specific validation for each part
    if (part === "day") {
      const dayNum = parseInt(numericValue);
      if (dayNum > 31) {
        newValue = "31";
      }
    } else if (part === "month") {
      const monthNum = parseInt(numericValue);
      if (monthNum > 12) {
        newValue = "12";
      }
    } else if (part === "year") {
      const currentYear = new Date().getFullYear();
      const yearNum = parseInt(numericValue);
      if (yearNum > currentYear) {
        newValue = currentYear.toString();
      }
    }

    // Update the dobParts state
    setDobParts((prev) => {
      const updatedDobParts = {
        ...prev,
        [part]: newValue,
      };

      // Only update personalInfo if we have all three parts
      if (
        updatedDobParts.day &&
        updatedDobParts.month &&
        updatedDobParts.year
      ) {
        const day = parseInt(updatedDobParts.day);
        const month = parseInt(updatedDobParts.month);
        const year = parseInt(updatedDobParts.year);

        if (
          day >= 1 &&
          day <= 31 &&
          month >= 1 &&
          month <= 12 &&
          year >= 1900 &&
          year <= new Date().getFullYear()
        ) {
          const formattedDate = `${year}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          dispatch(
            updatePersonalInfo({ field: "dob", value: formattedDate })
          );
        }
      }

      return updatedDobParts;
    });
  };

  /**
   * Render the first step which is used to collect the users personal information like the
   * First Name, Last Name, Date of Birth, Phone Number, and Email.
   * Afterwards, add the data to the personalInfo object in the store.
   * @returns
   */
  const renderStep1 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formGroup}>
        <StyledInput
          label="First Name"
          value={personalInfo?.first_name}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "first_name", value }))
          }
          error={errors.first_name}
          info="Please enter your first name as it appears on your ID"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Last Name"
          value={personalInfo?.last_name}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "last_name", value }))
          }
          error={errors.last_name}
          info="Please enter your last name as it appears on your ID"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText style={styles.label}>Date of Birth</StyledText>
        <View style={styles.dobContainer}>
          <View style={styles.dobInputContainer}>
            <StyledInput
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
            <StyledInput
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
          <View style={[styles.dobInputContainer, { flex: 2 }]}>
            <StyledInput
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
        {errors.dob && (
          <StyledText style={styles.errorText}>{errors.dob}</StyledText>
        )}
        <StyledText style={styles.infoText}>
          You must be at least 18 years old
        </StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Phone Number"
          value={personalInfo?.phoneNumber}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "phoneNumber", value }))
          }
          keyboardType="phone-pad"
          error={errors.phoneNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Email"
          value={personalInfo?.email}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "email", value }))
          }
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
          value={personalInfo?.address}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "address", value }))
          }
          error={errors.address}
          placeholder="Enter your street address"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="City"
          value={personalInfo?.city}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "city", value }))
          }
          placeholder="Enter your city"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          editable={false}
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Post Code"
          value={personalInfo?.postal_code}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "postal_code", value }))
          }
          error={errors.postal_code}
          placeholder="Enter your postal code"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.formGroup}>
        <StyledInput
          label="Country"
          value={personalInfo?.country}
          onChangeText={(value) =>
            dispatch(updatePersonalInfo({ field: "country", value }))
          }
          keyboardType="number-pad"
          error={errors.country}
          placeholder="Enter your ZIP code"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>
    </ScrollView>
  );
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
  },
  dobInput: {
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
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 4,
  },
});
