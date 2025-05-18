import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  TextStyle,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import StyledText from "./StyledText";

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  helper?: string;
  info?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  helper,
  info,
  style,
  variant,
  ...props
}) => {
  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: "bold",
    };
    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          color: "#000",
        };
      case "secondary":
        return {
          ...baseStyle,
          color: "#000",
        };
    }
    return baseStyle;
  };
  /* Get the textinput styles given the variant */
  const getTextInputStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
    };
    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          fontFamily: "BarlowRegular",
          padding: 15,
          fontSize: 15,
          fontWeight: "600",

        };
      case "secondary":
        return {
          ...baseStyle,
          fontFamily: "BarlowRegular",
          padding: 12,
          fontSize: 12,
          fontWeight: "600",
        };
      case "tertiary":
        return {
          ...baseStyle,
          fontFamily: "BarlowRegular",
          padding: 10,
          fontSize: 10,
          fontWeight: "600",
        };
    }
    return baseStyle;
  };

  return (
    <View style={styles.container}>
      {label && (
        <StyledText variant="h5" style={[styles.label]}>
          {label}
        </StyledText>
      )}
      <TextInput
        style={[getTextInputStyle(), style]}
        placeholderTextColor="#999999"
        {...props}
      />
      {helper && (
        <StyledText variant="h6" style={styles.helper}>
          {helper}
        </StyledText>
      )}
      {info && (
        <StyledText variant="h6" style={styles.info}>
          {info}
        </StyledText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    padding: 14,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontFamily: "BarlowRegular",
    fontSize: 14,
    color: "#333333",
  },
  helper: {
    marginTop: 8,
    position: "absolute",
    top: -15,
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  info: {
    marginTop: 8,
    fontSize: 12,
  },
});

export default StyledTextInput;
