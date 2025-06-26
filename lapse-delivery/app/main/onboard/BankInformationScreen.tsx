import { View, StyleSheet } from "react-native";
import React from "react";
import BankInfoForm from "@/app/components/onboarding/BankInfoForm";
import { useOnboarding } from "@/app/contexts/OnboardingContext";
import { router } from "expo-router";
import { BankInfoInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";

const BankInformationScreen = () => {
  const { completeStep, setBankInfo } = useOnboarding();

  const handleSubmit = (data: BankInfoInterface) => {
    setBankInfo(data);
    completeStep("/main/onboard/BankInformationScreen");
    router.back();
  };

  return (
    <View style={styles.container}>
      <BankInfoForm onSubmit={handleSubmit} />
    </View>
  );
};

export default BankInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
});
