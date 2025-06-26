export interface BankAccount {
  iban: string;
  bic: string;
  bankName: string;
  accountHolderName: string;
}

export interface PaymentDetails {
  hasProvidedBankDetails: boolean;
  bankAccount?: BankAccount;
  weeklyPayoutEnabled: boolean;
}
