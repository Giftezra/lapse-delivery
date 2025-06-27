import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledTextInput from "@/app/components/helpers/others/StyledTextInput";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAlertContext } from "@/app/context/AlertContext";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { updatePersonalInfo } from "@/app/store/slices/OnboardingSlice";

const WhereToDeliver = () => {
  const dispatch = useAppDispatch();
  const { personalInfo } = useAppSelector((state) => state.onboarding);

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");
  const borderColor = useThemeColor({}, "borders");
  const buttonColor = useThemeColor({}, "buttons");
  const highlightColor = useThemeColor({}, "highlight");

  const { setAlertConfig, setIsVisible } = useAlertContext();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOperatingCity, setIsOperatingCity] = useState(true);

  // Validate city input
  useEffect(() => {
    const trimmedCity = personalInfo?.city?.trim();
    const basicValid =
      trimmedCity?.length &&
      trimmedCity?.length >= 2 &&
      /^[a-zA-Z\s]+$/.test(trimmedCity);
    setIsValid(basicValid || false);

    if (basicValid) {
      const isOperating = operatingCities.some(
        (city) => city.toLowerCase() === trimmedCity.toLowerCase()
      );
      setIsOperatingCity(isOperating);
    } else {
      setIsOperatingCity(true); // Reset when input is invalid
    }
  }, [personalInfo?.city]);

  const handleNext = async () => {
    if (!isValid) {
      setAlertConfig({
        isVisible: true,
        title: "Invalid City",
        message:
          "Please enter a valid city name (minimum 2 characters, letters only).",
        type: "error",
        onConfirm: () => {
          setIsVisible(false);
        },
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call or validation
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically save the city to your app state/context
      // For now, we'll just navigate to the next screen
      router.push("/main/onboard/DeliveryChoiceScreen");
    }, 1000);
  };

  const operatingCities = [
    "Manchester",
    "Leeds",
    "Liverpool",
    "Birmingham",
    "Glasgow",
    "London",
    "Dublin",
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={32} color={Colors.light.buttons} />
          </View>
          <StyledText style={styles.title} variant="labelLarge">
            Where do you want to deliver?
          </StyledText>
          <StyledText style={styles.subtitle} variant="bodyMedium">
            Tell us your city so we can connect you with local delivery
            opportunities
          </StyledText>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <StyledTextInput
            label="Your City"
            placeholder="Enter your city name"
            value={personalInfo?.city}
            onChangeText={(text) =>
              dispatch(updatePersonalInfo({ field: "city", value: text }))
            }
            variant="primary"
            style={styles.cityInput}
            autoCapitalize="words"
            autoCorrect={false}
          />

          {(personalInfo?.city?.length || 0) > 0 && !isValid && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color="#FF3B30" />
              <StyledText style={styles.errorText} variant="labelSmall">
                Please enter a valid city name
              </StyledText>
            </View>
          )}

          {(personalInfo?.city?.length || 0) > 0 &&
            isValid &&
            !isOperatingCity && (
              <View style={styles.warningContainer}>
                <Ionicons name="information-circle" size={16} color="#FF9500" />
                <StyledText style={styles.warningText} variant="labelSmall">
                  We're currently not operating in your city yet. We're
                  expanding rapidly and hope to be there soon!
                </StyledText>
              </View>
            )}
        </View>

        {/* Operating Cities Section */}
        <View style={styles.popularSection}>
          <StyledText style={[styles.sectionTitle]} variant="labelMedium">
            Cities We Operate
          </StyledText>
          <View style={styles.popularCitiesGrid}>
            {operatingCities.map((city, index) => (
              <StyledButton
                key={index}
                title={city}
                variant="secondary"
                style={[
                  styles.cityButton,
                  {
                    backgroundColor: cardColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                  },
                ]}
                onPress={() =>
                  dispatch(updatePersonalInfo({ field: "city", value: city }))
                }
              />
            ))}
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={[buttonColor, borderColor]}
            style={styles.button}
            start={{ x: 2, y: 4 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isValid || !isOperatingCity}
              style={[(!isValid || !isOperatingCity) && styles.disabledButton]}
            >
              <StyledText>Continue</StyledText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WhereToDeliver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(45, 91, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 32,
  },
  cityInput: {
    marginBottom: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 12,
  },
  errorText: {
    color: "#FF3B30",
    marginLeft: 6,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 12,
  },
  warningText: {
    color: "#FF9500",
    marginLeft: 6,
  },
  popularSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  popularCitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cityButton: {
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  button: {
    borderRadius: 12,
    height: 40,
    maxWidth: 200,
    alignSelf: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
