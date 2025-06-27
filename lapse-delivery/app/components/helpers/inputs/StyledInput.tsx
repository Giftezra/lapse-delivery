import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import StyledText from "../others/StyledText";

interface StyledInputProps extends TextInputProps {
  label?: string;
  error?: string;
  info?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  error,
  info,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <StyledText variant="titleMedium" style={[styles.label]}>
          {label}
        </StyledText>
      )}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#999"
        {...props}
      />
      {info && (
        <StyledText variant="labelSmall" style={styles.info}>
          {info}
        </StyledText>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default StyledInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  info: {
    marginTop: 8,
  },
});
