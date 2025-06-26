export interface PersonalInfoInterface {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface BankInfoInterface {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  accountType: "checking" | "savings";
  branchCode: string;
}

export interface IdentityInfoInterface {
  idType: "driverLicense" | "passport" | "stateID";
  idNumber: string;
  expiryDate: string;
  frontImage: string;
  backImage: string;
  selfieImage: string;
}

export interface VehicleInfoInterface {
  vehicleType: "motorcycle" | "car";
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  registrationNumber: string;
  insuranceNumber: string;
  insuranceProvider: string;
  insuranceExpiryDate: string;
}

export interface OnboardingCardInterface {
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  route: string;
}

export interface OnboardingProgressInterface {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
}

export interface PersonalInfoForm extends PersonalInfoInterface {}

export interface BankInfoForm extends BankInfoInterface {}

export interface VehicleInfoForm extends VehicleInfoInterface {}

export interface DocumentUpload {
  uri: string;
  type: string;
}

export type VehicleType = "motorcycle" | "car";
