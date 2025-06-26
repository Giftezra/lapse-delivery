import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BankAccount } from "../../interfaces/PaymentInterface";

interface Props {
  onSubmit: (bankDetails: BankAccount) => void;
}

const BankDetailsForm = ({ onSubmit }: Props) => {
  const [bankDetails, setBankDetails] = useState<BankAccount>({
    iban: "",
    bic: "",
    bankName: "",
    accountHolderName: "",
  });

  const handleSubmit = () => {
    // Here you would typically validate the inputs before submitting
    onSubmit(bankDetails);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Bank Account</Text>
        <Text style={styles.subtitle}>
          Please provide your bank details for weekly payouts
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Holder Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.accountHolderName}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, accountHolderName: text })
            }
            placeholder="Enter account holder name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>IBAN</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.iban}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, iban: text.toUpperCase() })
            }
            placeholder="Enter IBAN"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>BIC/SWIFT</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.bic}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, bic: text.toUpperCase() })
            }
            placeholder="Enter BIC/SWIFT"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.bankName}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, bankName: text })
            }
            placeholder="Enter bank name"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Bank Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankDetailsForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
