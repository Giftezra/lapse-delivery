import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "@/app/components/helpers/others/StyledText";


export interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  variant,
  icon,
  style,
  disabled,
  ...props
}) => {
  const buttonColor = useThemeColor({}, "buttons");
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary"
          ? styles.secondaryButton
          : variant === "tertiary"
          ? styles.tertiaryButton
          : styles.tertiaryButton,
        disabled && styles.disabledButton,
        style,
        { backgroundColor: buttonColor },
      ]}
      disabled={disabled}
      {...props}
    >
      <StyledText style={[disabled && styles.disabledText]}>{title}</StyledText>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
  },
  tertiaryButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
  disabledText: {
    color: "#999999",
  },
});
