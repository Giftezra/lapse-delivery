import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { OnboardingCardInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const OnboardingCard: React.FC<OnboardingCardInterface> = ({
  title,
  description,
  icon,
  completed,
  route,
}) => {
  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon as any}
          size={24}
          color={completed ? "#4CAF50" : "#666666"}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.statusContainer}>
        {completed ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="chevron-forward" size={24} color="#666666" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OnboardingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666666",
  },
  statusContainer: {
    marginLeft: 16,
  },
});
