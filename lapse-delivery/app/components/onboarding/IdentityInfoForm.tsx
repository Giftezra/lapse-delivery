import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { IdentityInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "../helpers/others/StyledText";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface IdentityInfoFormProps {
  onSubmit: (data: IdentityInfoInterface) => void;
  initialData?: IdentityInfoInterface;
  currentStep: number;
}

/**
 * IdentityInfoForm Component
 *
 * A two-step form for identity verification:
 * Step 1: ID type selection
 * Step 2: Document upload and selfie
 */
const IdentityInfoForm = ({
  onSubmit,
  initialData,
  currentStep,
}: IdentityInfoFormProps) => {
  // Form state management
  const [formData, setFormData] = useState<IdentityInfoInterface>(
    initialData || {
      idType: "driverLicense",
      idNumber: "",
      expiryDate: "",
      frontImage: "",
      backImage: "",
      selfieImage: "",
    }
  );

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleIdTypeSelect = (
    type: "driverLicense" | "passport" | "stateID"
  ) => {
    const newData = { ...formData, idType: type };
    setFormData(newData);
    onSubmit(newData);
  };

  /**
   * Renders Step 1: ID Type Selection
   */
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <TouchableOpacity
        style={[
          styles.idTypeOption,
          formData.idType === "driverLicense" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelect("driverLicense")}
      >
        <Ionicons
          name="car-outline"
          size={24}
          color={formData.idType === "driverLicense" ? "#4CD964" : "#FFFFFF"}
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>Driver's License</StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.idTypeOption,
          formData.idType === "passport" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelect("passport")}
      >
        <Ionicons
          name="document-outline"
          size={24}
          color={formData.idType === "passport" ? "#4CD964" : "#FFFFFF"}
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>Passport</StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.idTypeOption,
          formData.idType === "stateID" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelect("stateID")}
      >
        <Ionicons
          name="card-outline"
          size={24}
          color={formData.idType === "stateID" ? "#4CD964" : "#FFFFFF"}
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>State ID</StyledText>
      </TouchableOpacity>
    </View>
  );

  /**
   * Handles image selection for document uploads and selfie
   */
  const handleImagePick = async (
    field: "frontImage" | "backImage" | "selfieImage"
  ) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newData = {
          ...formData,
          [field]: result.assets[0].uri,
        };
        setFormData(newData);
        onSubmit(newData);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  /**
   * Renders Step 2: Document Upload and Selfie
   */
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.uploadSection}>
        <StyledText style={styles.sectionTitle}>
          Upload Proof Identity
        </StyledText>
        <StyledText style={styles.sectionSubtitle}>We accept only:</StyledText>
        <StyledText style={styles.acceptedDocs}>
          ID card, Driver's license, Passport
        </StyledText>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePick("frontImage")}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
          <StyledText style={styles.uploadText}>Upload Front Side</StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePick("backImage")}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
          <StyledText style={styles.uploadText}>Upload Back Side</StyledText>
        </TouchableOpacity>

        <View style={styles.selfieSection}>
          <StyledText style={styles.sectionTitle}>
            Take Selfie with Identity
          </StyledText>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick("selfieImage")}
          >
            <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
            <StyledText style={styles.uploadText}>Take Selfie</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return currentStep === 1 ? renderStep1() : renderStep2();
};

export default IdentityInfoForm;

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  idTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 12,
    height: 56,
  },
  selectedOption: {
    backgroundColor: "rgba(76, 217, 100, 0.1)",
    borderColor: "#4CD964",
    borderWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  idTypeText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  uploadSection: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: "#FFFFFF",
    opacity: 0.7,
    fontSize: 14,
    marginBottom: 4,
  },
  acceptedDocs: {
    color: "#4CD964",
    fontSize: 14,
    marginBottom: 16,
  },
  uploadButton: {
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderStyle: "dashed",
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
  },
  selfieSection: {
    marginTop: 24,
  },
});
