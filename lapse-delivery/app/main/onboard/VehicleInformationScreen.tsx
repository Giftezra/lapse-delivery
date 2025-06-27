import { View, StyleSheet, Modal } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { VehicleInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import {
  markStepAsCompleted,
  updateVehicleInfo,
} from "@/app/store/slices/OnboardingSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "@/app/components/helpers/others/StyledText";
import { ScrollView } from "react-native-gesture-handler";
import StyledInput from "@/app/components/helpers/inputs/StyledInput";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

const vehicleInformationModal = (
  setIsInfoModalVisible: (isVisible: boolean) => void,
  color: any,
  iconColor: any,
) => {
  return (
    <View style={[styles.infoOverlay, { backgroundColor: color }]}>
      <View style={styles.infoOverlayContent}>
        <View style={styles.infoOverlayHeader}>
          <StyledText
            children="Why do we need this information?"
            variant="titleLarge"
          />
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={iconColor}
            onPress={() => setIsInfoModalVisible(false)}
            style={styles.closeButton}
          />
        </View>
        <View>
          <StyledText
            children={
              "This information is required to ensure we are providing the best service to you and our users.\n\nThis informations is also used to ensure we are following all laws and regustions within the country."
            }
          />
        </View>
      </View>
    </View>
  );
};

/**
 * Format the date field to automatically insert dashes for YYYY-MM-DD format
 * @param date - The raw date string from user input
 * @returns Formatted date string with dashes
 */
const formatDate = (date: string) => {
  // Remove any existing dashes and non-numeric characters
  const cleaned = date.replace(/[^0-9]/g, "");

  // Format based on length
  if (cleaned.length <= 4) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  } else {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(
      6,
      8
    )}`;
  }
};

const VehicleInformationScreen = () => {
  const { vehicleType } = useLocalSearchParams<{ vehicleType: string }>();
  const dispatch = useAppDispatch();
  const { vehicleInfo } = useAppSelector((state) => state.onboarding);

  const [isInfoModalVisible, setIsInfoModalVisible] = React.useState(false);

  // Import the colors
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");
  const textColor = useThemeColor({}, "text");

  const [errors, setErrors] = React.useState<{
    make?: string;
    model?: string;
    year?: string;
    registrationNumber?: string;
    insuranceNumber?: string;
    insuranceProvider?: string;
    insuranceExpiryDate?: string;
    lastInspectionDate?: string;
    nextInspectionDate?: string;
    documents?: string;
  }>({});

  /* Validate the form and display an error message when any part of the form is not validated properly.
   */
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!vehicleInfo?.make?.trim()) {
      newErrors.make = "Make is required";
    }
    if (!vehicleInfo?.model?.trim()) {
      newErrors.model = "Model is required";
    }
    if (!vehicleInfo?.year?.trim()) {
      newErrors.year = "Year is required";
    }
    if (!vehicleInfo?.registrationNumber?.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }
    if (!vehicleInfo?.insuranceNumber?.trim()) {
      newErrors.insuranceNumber = "Insurance number is required";
    }
    if (!vehicleInfo?.insuranceProvider?.trim()) {
      newErrors.insuranceProvider = "Insurance provider is required";
    }
    if (!vehicleInfo?.insuranceExpiryDate?.trim()) {
      newErrors.insuranceExpiryDate = "Insurance expiry date is required";
    }
    if (!vehicleInfo?.roadWorthy?.lastInspectionDate?.trim()) {
      newErrors.lastInspectionDate = "Last inspection date is required";
    }
    if (!vehicleInfo?.roadWorthy?.nextInspectionDate?.trim()) {
      newErrors.nextInspectionDate = "Next inspection date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Submit the form if all data has been validated */
  const submitForm = () => {
    if (validateForm()) {
      dispatch(
        markStepAsCompleted({ step: "/main/onboard/VehicleInformationScreen" })
      );
      router.push('/main/onboard/OnboardingScreen');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View>
        <StyledText children="Vehicle Information" variant="titleLarge" />
      </View>
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Vehicle Information */}
        <>
          <View style={styles.titleContainer}>
            <StyledText
              children="Vehicle Information"
              style={styles.label}
              variant="titleMedium"
            />
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="green"
              onPress={() => setIsInfoModalVisible(true)}
            />
          </View>
          <View style={[styles.cards, { backgroundColor: cardColor }]}>
            <StyledInput
              style={[styles.input, errors.make && styles.inputError]}
              value={vehicleInfo?.make}
              onChangeText={(value) =>
                dispatch(updateVehicleInfo({ field: "make", value }))
              }
              placeholder={`Enter ${vehicleType} make`}
              label="Make"
              error={errors.make}
            />
            <StyledInput
              style={[styles.input, errors.model && styles.inputError]}
              value={vehicleInfo?.model}
              onChangeText={(value) =>
                dispatch(updateVehicleInfo({ field: "model", value }))
              }
              placeholder={`Enter ${vehicleType} model`}
              label="Model"
              error={errors.model}
            />
            <StyledInput
              style={[styles.input, errors.year && styles.inputError]}
              value={vehicleInfo?.year}
              onChangeText={(value) =>
                dispatch(updateVehicleInfo({ field: "year", value }))
              }
              placeholder="Enter year"
              label="Year"
              keyboardType="numeric"
              maxLength={4}
              error={errors.year}
            />
            <StyledInput
              label="Registration Number"
              style={[
                styles.input,
                errors.registrationNumber && styles.inputError,
              ]}
              value={vehicleInfo?.registrationNumber}
              onChangeText={(value) =>
                dispatch(
                  updateVehicleInfo({ field: "registrationNumber", value })
                )
              }
              placeholder="Enter registration number"
              error={errors.registrationNumber}
            />
          </View>
        </>
        {/* Insurance Information */}
        <>
          <View style={styles.titleContainer}>
            <StyledText
              children="Insurance Information"
              style={styles.label}
              variant="titleMedium"
            />
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="green"
              onPress={() => setIsInfoModalVisible(true)}
            />
          </View>
          <View style={[styles.cards, { backgroundColor: cardColor }]}>
            <StyledInput
              label="Insurance Provider"
              style={[
                styles.input,
                errors.insuranceProvider && styles.inputError,
              ]}
              value={vehicleInfo?.insuranceProvider}
              onChangeText={(value) =>
                dispatch(
                  updateVehicleInfo({ field: "insuranceProvider", value })
                )
              }
              placeholder="Enter insurance provider"
              error={errors.insuranceProvider}
            />

            <StyledInput
              label="Insurance Number"
              style={[
                styles.input,
                errors.insuranceNumber && styles.inputError,
              ]}
              value={vehicleInfo?.insuranceNumber}
              onChangeText={(value) =>
                dispatch(updateVehicleInfo({ field: "insuranceNumber", value }))
              }
              placeholder="Enter insurance number"
              error={errors.insuranceNumber}
            />
            <StyledInput
              label="Insurance Expiry Date"
              style={[
                styles.input,
                errors.insuranceExpiryDate && styles.inputError,
              ]}
              value={vehicleInfo?.insuranceExpiryDate}
              onChangeText={(value) =>
                dispatch(
                  updateVehicleInfo({
                    field: "insuranceExpiryDate",
                    value: formatDate(value),
                  })
                )
              }
              placeholder="YYYY-MM-DD"
              error={errors.insuranceExpiryDate}
              maxLength={10}
            />
          </View>
        </>
        {/* Road Worthiness */}
        <>
          <View style={styles.titleContainer}>
            <StyledText
              children="Road Worthiness"
              style={styles.label}
              variant="titleMedium"
            />
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="green"
              onPress={() => setIsInfoModalVisible(true)}
            />
          </View>

          <View style={[styles.cards, { backgroundColor: cardColor }]}>
            <StyledInput
              label="Last Inspection Date"
              style={[
                styles.input,
                errors.lastInspectionDate && styles.inputError,
              ]}
              value={vehicleInfo?.roadWorthy?.lastInspectionDate}
              onChangeText={(value) =>
                dispatch(
                  updateVehicleInfo({
                    field: "roadWorthy",
                    value: {
                      ...vehicleInfo?.roadWorthy,
                      lastInspectionDate: formatDate(value),
                    },
                  })
                )
              }
              placeholder="YYYY-MM-DD"
              error={errors.lastInspectionDate}
              maxLength={10}
            />
            <StyledInput
              label="Next Inspection Date"
              style={[
                styles.input,
                errors.nextInspectionDate && styles.inputError,
              ]}
              value={vehicleInfo?.roadWorthy?.nextInspectionDate}
              onChangeText={(value) =>
                dispatch(
                  updateVehicleInfo({
                    field: "roadWorthy",
                    value: {
                      ...vehicleInfo?.roadWorthy,
                      nextInspectionDate: formatDate(value),
                    },
                  })
                )
              }
              placeholder="YYYY-MM-DD"
              error={errors.nextInspectionDate}
              maxLength={10}
            />
            <StyledInput
              label="Documents"
              value={vehicleInfo?.roadWorthy?.documents}
              onChangeText={(value) =>
                dispatch(updateVehicleInfo({ field: "roadWorthy", value }))
              }
              placeholder="Upload Document or Images"
              error={errors.documents}
            />

            <Checkbox.Item
              label="Is the vehicle road worthy?"
              status={
                vehicleInfo?.roadWorthy?.isRoadWorthy ? "checked" : "unchecked"
              }
              onPress={() =>
                dispatch(
                  updateVehicleInfo({
                    field: "roadWorthy",
                    value: {
                      ...vehicleInfo?.roadWorthy,
                      isRoadWorthy: !vehicleInfo?.roadWorthy?.isRoadWorthy,
                    },
                  })
                )
              }
            />
          </View>
        </>
      </ScrollView>

        <StyledButton
        title="Save"
        variant="primary"
        onPress={submitForm}
        style={styles.button}
      />

      {/* Display the overlay explaining to the user why we require some of the data we do. */}
      {isInfoModalVisible &&
        vehicleInformationModal(setIsInfoModalVisible, backgroundColor, textColor)}
    </View>
  );
};

export default VehicleInformationScreen;

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
    fontWeight: "bold",
    marginBottom: 12,
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
  cards: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },

  infoOverlay: {
    position: "absolute",
    top: 100,
    left: 100,
    right: 0,
    bottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    maxWidth: 300,
    maxHeight: 300,
    padding: 20,
    borderRadius: 20,
  },
  infoOverlayContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  infoOverlayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  button: {
    maxWidth: 200,
  },
});
