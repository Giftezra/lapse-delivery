import React, { createContext, useContext, useState } from "react";
import {
  PersonalInfoForm,
  BankInfoForm,
  VehicleInfoForm,
  DocumentUpload,
  VehicleType,
} from "../interfaces/onboarding/OnboardingInterfaces";

interface OnboardingState {
  vehicleType: VehicleType | null;
  personalInfo: PersonalInfoForm | null;
  bankInfo: BankInfoForm | null;
  vehicleInfo: VehicleInfoForm | null;
  documents: {
    idFront: DocumentUpload | null;
    idBack: DocumentUpload | null;
    selfie: DocumentUpload | null;
    registration?: DocumentUpload | null;
    insurance?: DocumentUpload | null;
    vehiclePhoto?: DocumentUpload | null;
  };
  completedSteps: string[];
}

interface OnboardingContextType {
  state: OnboardingState;
  setVehicleType: (type: VehicleType) => void;
  setPersonalInfo: (info: PersonalInfoForm) => void;
  setBankInfo: (info: BankInfoForm) => void;
  setVehicleInfo: (info: VehicleInfoForm) => void;
  setDocument: (
    type: keyof OnboardingState["documents"],
    document: DocumentUpload
  ) => void;
  completeStep: (route: string) => void;
  isStepCompleted: (route: string) => boolean;
}

const defaultState: OnboardingState = {
  vehicleType: null,
  personalInfo: null,
  bankInfo: null,
  vehicleInfo: null,
  documents: {
    idFront: null,
    idBack: null,
    selfie: null,
  },
  completedSteps: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<OnboardingState>(defaultState);

  const setVehicleType = (type: VehicleType) => {
    setState((prev) => ({ ...prev, vehicleType: type }));
  };

  const setPersonalInfo = (info: PersonalInfoForm) => {
    setState((prev) => ({ ...prev, personalInfo: info }));
  };

  const setBankInfo = (info: BankInfoForm) => {
    setState((prev) => ({ ...prev, bankInfo: info }));
  };

  const setVehicleInfo = (info: VehicleInfoForm) => {
    setState((prev) => ({ ...prev, vehicleInfo: info }));
  };

  const setDocument = (
    type: keyof OnboardingState["documents"],
    document: DocumentUpload
  ) => {
    setState((prev) => ({
      ...prev,
      documents: { ...prev.documents, [type]: document },
    }));
  };

  const completeStep = (route: string) => {
    setState((prev) => ({
      ...prev,
      completedSteps: [...new Set([...prev.completedSteps, route])],
    }));
  };

  const isStepCompleted = (route: string) => {
    return state.completedSteps.includes(route);
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setVehicleType,
        setPersonalInfo,
        setBankInfo,
        setVehicleInfo,
        setDocument,
        completeStep,
        isStepCompleted,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export default OnboardingContext;
