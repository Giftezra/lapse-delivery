import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { BankAccount } from "../../interfaces/PaymentInterface";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  bankAccount: BankAccount;
  onEdit: () => void;
}

const ExistingBankAccount = ({ bankAccount, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payout</Text>
      </View>

      <TouchableOpacity style={styles.bankDetails} onPress={onEdit}>
        <View style={styles.bankIcon}>
          <Ionicons name="business" size={24} color="#4A90E2" />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.bankName}>{bankAccount.bankName}</Text>
          <Text style={styles.accountNumber}>
            {"•••••••••••" + bankAccount.iban.slice(-4)}
          </Text>
          <Text style={styles.payoutText}>Earnings paid out weekly</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          A week runs from Monday at 4:00 a.m. to the following Monday at 3:59
          a.m. All rides during that time period will count towards that week's
          pay period.
        </Text>
      </View>
    </View>
  );
};

export default ExistingBankAccount;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  bankDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bankIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#F0F7FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
  },
  accountNumber: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  payoutText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
