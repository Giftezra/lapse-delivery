import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { OnboardingCardInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "../helpers/others/StyledText";

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

  const cardColor = useThemeColor({}, "cards");
  const borderColor = useThemeColor({}, "borders");
  const tintColor = useThemeColor({}, "tint");

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cardColor, borderColor }]}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon as any}
          size={24}
          color={tintColor}
        />
      </View>
      <View style={styles.content}>
        <StyledText style={styles.title} children={title} />
        <StyledText style={styles.description} children={description} />
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
    paddingVertical: 30,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
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
