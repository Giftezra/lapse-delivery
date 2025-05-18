import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import React from "react";
import StyledText from "../others/StyledText";
interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant: "primary" | "secondary" | "tertiary";
  textProps?: TextProps;
}

const StyledButton = ({ title, variant, textProps, ...props }: StyledButtonProps) => {
  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    };
    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: "#000",
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#000",
        };
      case "tertiary":
        return {
          ...baseStyle,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#000",
        };
    }
    return baseStyle;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: "bold",
    };
    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          color: "#fff",
        };
      case "secondary":
        return {
          ...baseStyle,
          color: "#000",
        };
      case "tertiary":
        return {
          ...baseStyle,
          color: "#000",
        };
    }
    return baseStyle;
  };

  return (
    <TouchableOpacity {...props} style={[getButtonStyle(), props.style]}>
      <Text {...textProps} style={[getTextStyle(), textProps?.style]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({});
