import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledInput from "@/app/components/helpers/inputs/StyledInput";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { updatePersonalInfo } from "@/app/store/slices/OnboardingSlice";
import { Checkbox } from "react-native-paper";
import useOnboarding from "@/app/hook/useOnboarding";
import { useAlertContext } from "@/app/context/AlertContext";
import { router } from "expo-router";

const PasswordScreen = () => {
  const dispatch = useAppDispatch();
  const { personalInfo, completedSteps, vehicleInfo, identityInfo, bankInfo } =
    useAppSelector((state) => state.onboarding);
  const { handleOnboarding, isOnboarding } = useOnboarding();
  const { setAlertConfig, setIsVisible } = useAlertContext();

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cards");
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const isPasswordValid = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };

  /**
   * When all the fields are filled out, submit the form.
   * But first ensure that the user has agreed to the terms and conditions,
   * and that the passwords match.
   * @returns
   */
  const handleSubmit = () => {
    router.replace('/main/screens/DashboardScreen')
    // const credentials = {
    //   personalInfo,
    //   vehicleInfo,
    //   identityInfo,
    //   bankInfo,
    // };
    // console.log(credentials);
    // // Check if the user has agreed to the terms and conditions
    // if (!agreeToTerms) {
    //   setAlertConfig({
    //     title: "Error",
    //     message: "You must agree to the terms and conditions",
    //     type: "error",
    //     isVisible: true,
    //     onConfirm() {
    //       setIsVisible(false);
    //     },
    //   });
    //   return;
    // }
    // // Check if the password was filled out and validated
    // if (!isPasswordValid(personalInfo?.password || "")) {
    //   setAlertConfig({
    //     title: "Error",
    //     message: "Check password requirements",
    //     type: "error",
    //     isVisible: true,
    //     onConfirm() {
    //       setIsVisible(false);
    //     },
    //   });
    //   return;
    // }
    // // If all validations pass, proceed with onboarding
    // handleOnboarding();
  };

  return (
    <View style={[styles.maincontainer, { backgroundColor }]}>
      <View style={[styles.contentContainer, { backgroundColor: cardColor }]}>
        <StyledText
          children="Create a password"
          style={{ alignSelf: "center", paddingVertical: 10 }}
          variant="titleLarge"
        />
        <View style={styles.inputContainer}>
          <StyledInput
            label="Password"
            value={personalInfo?.password}
            onChangeText={(value) =>
              dispatch(updatePersonalInfo({ field: "password", value }))
            }
            secureTextEntry={!showPassword}
          />
          <StyledInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry={!showPassword}
          />
          {/* Display password error */}
          {personalInfo?.password !== confirmPassword && (
            <StyledText
              style={{ color: "red", fontSize: 10 }}
              variant="bodySmall"
            >
              Passwords do not match
            </StyledText>
          )}

          <View style={{ maxWidth: 250 }}>
            <Checkbox.Item
              style={{
                alignSelf: "flex-start",
                gap: 65,
                borderWidth: 1,
                maxHeight: 50,
              }}
              label="Show password"
              status={showPassword ? "checked" : "unchecked"}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>

        {/* Display the password information here */}
        <View style={styles.passwordContainer}>
          <StyledText
            variant="bodySmall"
            children="Password must be at least 12"
          />
          <StyledText
            variant="bodySmall"
            children="Must contain at least one uppercase"
          />
          <StyledText
            variant="bodySmall"
            children="Must contain at least one lowercase"
          />
          <StyledText
            variant="bodySmall"
            children="Must contain at least one number"
          />
          <StyledText
            variant="bodySmall"
            children="Must contain at least one special character"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Checkbox.Item
            label="I agree to the terms and conditions"
            status={agreeToTerms ? "checked" : "unchecked"}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          />
          <StyledButton
            title={isOnboarding ? "Submitting..." : "Submit"}
            onPress={handleSubmit}
            disabled={isOnboarding}
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    height: "auto",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 30,
    gap: 15,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  passwordContainer: {
    gap: 5,
    paddingHorizontal: 15,
  },
});
