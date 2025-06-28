import { GestureResponderEvent } from "react-native";
export interface PersonalInfoInterface {
  first_name?: string;
  last_name?: string;
  dob?: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  password?: string;
}

export interface BankInfoInterface {
  accountHolderName?: string;
  accountNumber?: string;
  bankName?: string;
  iban?: string;
  bic?: string;
}

export interface IdentityInfoInterface {
  idType: "driverLicense" | "passport" | "governmentID";
  idNumber: string;
  expiryDate: string;
  frontImage: string;
  backImage: string;
  selfieImage: string;
}

export interface VehicleInfoInterface {
  vehicleType: "motorcycle" | "car" | "bicycle";
  make?: string;
  model?: string;
  year?: string;
  registrationNumber?: string;
  insuranceNumber?: string;
  insuranceProvider?: string;
  insuranceExpiryDate?: string;
  roadWorthy?: {
    isRoadWorthy?: boolean;
    lastInspectionDate?: string;
    nextInspectionDate?: string;
    documents?: any;
  };
}

export interface DeliveryOptionsChoicesInterface {
  title: string;
  description?: string;
  age: number;
  license?: string;
  expierience?: string;
  vehicle: "car" | "bicycle" | "motorcycle";
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface OnboardingCardInterface {
  title: string;
  description: string;
  icon: string;
  route: string;
  completed?: boolean;
}

export default interface OnboardingState {
  personalInfo: PersonalInfoInterface | null;
  bankInfo: BankInfoInterface | null;
  vehicleInfo: VehicleInfoInterface | null;
  identityInfo: IdentityInfoInterface | null;
  completedSteps: string[];
}
