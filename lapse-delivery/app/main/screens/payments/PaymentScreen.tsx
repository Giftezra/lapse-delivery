import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  PaymentDetails,
  BankAccount,
} from "@/app/interfaces/PaymentInterface";
import ExistingBankAccount from "../../../components/payments/ExistingBankAccount";
import BankDetailsForm from "../../../components/payments/BankDetailsForm";

const PaymentScreen = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    hasProvidedBankDetails: false,
    weeklyPayoutEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleBankDetailsSubmit = (bankAccount: BankAccount) => {
    setPaymentDetails({
      ...paymentDetails,
      hasProvidedBankDetails: true,
      bankAccount,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing || !paymentDetails.hasProvidedBankDetails) {
    return (
      <View style={styles.container}>
        <BankDetailsForm onSubmit={handleBankDetailsSubmit} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExistingBankAccount
        bankAccount={paymentDetails.bankAccount!}
        onEdit={handleEdit}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
