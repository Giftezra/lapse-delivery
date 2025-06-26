import { View, StyleSheet } from "react-native";
import React from "react";
import VehicleInfoForm from "@/app/components/onboarding/VehicleInfoForm";
import { useOnboarding } from "@/app/contexts/OnboardingContext";
import { router, useLocalSearchParams } from "expo-router";
import {
  VehicleInfoInterface,
  VehicleType,
} from "@/app/interfaces/onboarding/OnboardingInterfaces";

const VehicleInformationScreen = () => {
  const { vehicleType } = useLocalSearchParams<{ vehicleType: string }>();
  const { completeStep, setVehicleInfo } = useOnboarding();

  const handleSubmit = (data: VehicleInfoInterface) => {
    setVehicleInfo(data);
    completeStep("/main/onboard/VehicleInformationScreen");
    router.back();
  };

  return (
    <View style={styles.container}>
      <VehicleInfoForm
        onSubmit={handleSubmit}
        vehicleType={vehicleType as VehicleType}
      />
    </View>
  );
};

export default VehicleInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
});
