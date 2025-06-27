import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OnboardingState, {
  BankInfoInterface,
  IdentityInfoInterface,
  PersonalInfoInterface,
  VehicleInfoInterface,
} from "@/app/interfaces/onboarding/OnboardingInterfaces";

const initialState: OnboardingState = {
  personalInfo: null,
  bankInfo: null,
  vehicleInfo: null,
  identityInfo: null,
  completedSteps: [],
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    /* Mark step as completed */
    markStepAsCompleted: (
      state,
      action: PayloadAction<{
        step: string;
      }>
    ) => {
      state.completedSteps.push(action.payload.step);
    },

    /* Manages how the users personal information is collected and stored in the state. */
    // Set the personal information of the user.
    personalInfo: (
      state,
      action: PayloadAction<{
        personalInfo: PersonalInfoInterface | null;
      }>
    ) => {
      state.personalInfo = action.payload.personalInfo;
    },
    // Update the personalinfo form
    updatePersonalInfo: (
      state,
      action: PayloadAction<{
        field: keyof PersonalInfoInterface;
        value: string;
      }>
    ) => {
      if (state.personalInfo) {
        state.personalInfo[action.payload.field] = action.payload.value;
      } else {
        state.personalInfo = {
          first_name: "",
          last_name: "",
          dob: "",
          phoneNumber: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          [action.payload.field]: action.payload.value,
        } as PersonalInfoInterface;
      }
    },

    /**
     * Manages how the users vehicle information is stored in the state.
     * Since the user would fill out this information over a series of screens,
     * we need to be able to update the state with the new information as it is collected.
     */
    // Set the vehicle information of the user.
    vehicleInfo: (
      state,
      action: PayloadAction<{
        vehicleInfo: VehicleInfoInterface | null;
      }>
    ) => {
      state.vehicleInfo = action.payload.vehicleInfo;
    },
    // Update the vehicleinfo form
    updateVehicleInfo: (
      state,
      action: PayloadAction<{
        field: keyof VehicleInfoInterface;
        value: string | VehicleInfoInterface["roadWorthy"];
      }>
    ) => {
      if (state.vehicleInfo) {
        // Handle vehicleType field separately to maintain type safety
        if (action.payload.field === "vehicleType") {
          state.vehicleInfo.vehicleType = action.payload.value as
            | "motorcycle"
            | "car"
            | "bicycle";
        } else if (action.payload.field === "roadWorthy") {
          // Handle roadWorthy field as an object
          state.vehicleInfo.roadWorthy = action.payload
            .value as VehicleInfoInterface["roadWorthy"];
        } else {
          (state.vehicleInfo as any)[action.payload.field] =
            action.payload.value;
        }
      } else {
        state.vehicleInfo = {
          vehicleType: "bicycle",
          make: "",
          model: "",
          year: "",
          color: "",
          licensePlate: "",
          registrationNumber: "",
          insuranceNumber: "",
          insuranceProvider: "",
          insuranceExpiryDate: "",
          roadWorthy: {
            isRoadWorthy: false,
            lastInspectionDate: "",
            nextInspectionDate: "",
            documents: [],
          },
          [action.payload.field]: action.payload.value,
        } as VehicleInfoInterface;
      }
    },

    /**
     * Manages how the users bank information is stored  in the states.
     */
    bankInfo: (
      state,
      action: PayloadAction<{
        bankInfo: BankInfoInterface | null;
      }>
    ) => {
      state.bankInfo = action.payload.bankInfo;
    },

    // Update the bankinfo form
    updateBankInfo: (
      state,
      action: PayloadAction<{
        field: keyof BankInfoInterface;
        value: string;
      }>
    ) => {
      if (state.bankInfo) {
        state.bankInfo[action.payload.field] = action.payload.value;
      } else {
        state.bankInfo = {
          accountHolderName: "",
          accountNumber: "",
          bankName: "",
          iban: "",
          bic: "",
        } as BankInfoInterface;
      }
    },

    /**
     * Manage the users identity information to enable the collection and management of their
     * identity documents.
     *
     * The methods will both update the state with the new information as it is collected.
     * And the identityInfo will be used to store the users identity information.
     */
    identityInfo: (
      state,
      action: PayloadAction<{
        identityInfo: IdentityInfoInterface | null;
      }>
    ) => {
      state.identityInfo = action.payload.identityInfo;
    },

    // Update the identityinfo form
    updateIdentityInfo: (
      state,
      action: PayloadAction<{
        field: keyof IdentityInfoInterface;
        value: string;
      }>
    ) => {
      if (state.identityInfo) {
        if (action.payload.field === "idType") {
          state.identityInfo.idType = action.payload.value as
            | "driverLicense"
            | "passport"
            | "governmentID";
        } else {
          state.identityInfo[action.payload.field] = action.payload.value;
        }
      } else {
        state.identityInfo = {
          idType: "driverLicense",
          idNumber: "",
          expiryDate: "",
          frontImage: "",
          backImage: "",
          selfieImage: "",
        } as IdentityInfoInterface;
      }
    },
  },
});

export const {
  personalInfo,
  updatePersonalInfo,
  vehicleInfo,
  updateVehicleInfo,
  bankInfo,
  updateBankInfo,
  identityInfo,
  updateIdentityInfo,
  markStepAsCompleted,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
