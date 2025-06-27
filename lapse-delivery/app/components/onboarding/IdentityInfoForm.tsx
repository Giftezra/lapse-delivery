import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { IdentityInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "../helpers/others/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  updateIdentityInfo,
  markStepAsCompleted,
} from "@/app/store/slices/OnboardingSlice";

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
  const dispatch = useAppDispatch();
  const { identityInfo } = useAppSelector((state) => state.onboarding);

  /**
   * Handles ID type selection and automatically proceeds to step 2
   */
  const handleIdTypeSelection = (
    idType: "driverLicense" | "passport" | "governmentID"
  ) => {
    dispatch(updateIdentityInfo({ field: "idType", value: idType }));
    // Mark step 1 as completed
    dispatch(markStepAsCompleted({ step: '' }));
    // Automatically proceed to step 2
    setTimeout(() => {
      onSubmit(
        identityInfo || {
          idType,
          idNumber: "",
          expiryDate: "",
          frontImage: "",
          backImage: "",
          selfieImage: "",
        }
      );
    }, 100);
  };

  /**
   * Renders Step 1: ID Type Selection
   */
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <TouchableOpacity
        style={[
          styles.idTypeOption,
          identityInfo?.idType === "driverLicense" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelection("driverLicense")}
      >
        <Ionicons
          name="car-outline"
          size={24}
          color={
            identityInfo?.idType === "driverLicense" ? "#4CD964" : "#FFFFFF"
          }
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>Driver's License</StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.idTypeOption,
          identityInfo?.idType === "passport" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelection("passport")}
      >
        <Ionicons
          name="document-outline"
          size={24}
          color={identityInfo?.idType === "passport" ? "#4CD964" : "#FFFFFF"}
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>Passport</StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.idTypeOption,
          identityInfo?.idType === "governmentID" && styles.selectedOption,
        ]}
        onPress={() => handleIdTypeSelection("governmentID")}
      >
        <Ionicons
          name="card-outline"
          size={24}
          color={
            identityInfo?.idType === "governmentID" ? "#4CD964" : "#FFFFFF"
          }
          style={styles.icon}
        />
        <StyledText style={styles.idTypeText}>Government ID</StyledText>
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders Step 2: Document Upload and Selfie
   */
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.uploadSection}>
        <StyledText
          style={styles.sectionTitle}
          children="Upload Proof Identity"
        />
        <StyledText style={styles.sectionSubtitle} children="We accept only:" />
        <StyledText
          style={styles.acceptedDocs}
          children="ID card, Driver's license, Passport"
        />

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            // Simulate front image upload
            dispatch(
              updateIdentityInfo({ field: "frontImage", value: "frontImage" })
            );
          }}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
          <StyledText style={styles.uploadText} children="Upload Front Side" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            // Simulate back image upload
            dispatch(
              updateIdentityInfo({ field: "backImage", value: "backImage" })
            );
          }}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
          <StyledText style={styles.uploadText} children="Upload Back Side" />
        </TouchableOpacity>

        <View style={styles.selfieSection}>
          <StyledText
            style={styles.sectionTitle}
            children="Take Selfie with Identity"
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              // Simulate selfie capture
              dispatch(
                updateIdentityInfo({
                  field: "selfieImage",
                  value: "selfieImage",
                })
              );
            }}
          >
            <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
            <StyledText style={styles.uploadText} children="Take Selfie" />
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
