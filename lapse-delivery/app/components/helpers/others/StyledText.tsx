import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import React from "react";

interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "overline";
}

const StyledText = ({
  children,
  style,
  variant,
  ...props
}: StyledTextProps) => {
  const getVariantStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: "400",
      color: "#000",
      letterSpacing: 0.5,
    };
    switch (variant) {
      case "h1":
        return {
          ...baseStyle,
          fontSize: 28,
          fontWeight: "500",
          fontFamily: "RobotoBold",
        };
      case "h2":
        return {
          ...baseStyle,
          fontSize: 24,
          fontWeight: "500",
          fontFamily: "RobotoRegular",
        };
      case "h3":
        return {
          ...baseStyle,
          fontSize: 20,
          fontWeight: "500",
          fontFamily: "RobotoRegular",
          textTransform: "capitalize",
        };
      case "h4":
        return {
          ...baseStyle,
          fontSize: 16,
          fontWeight: "500",
          fontFamily: "RobotoRegular",
          textTransform: "capitalize",
        };
      case "h5":
        return {
          ...baseStyle,
          fontSize: 14,
          fontWeight: "500",
          fontFamily: "RobotoRegular",
          textTransform: "capitalize",
        };
      case "h6":
        return {
          ...baseStyle,
          fontSize: 12,
          fontWeight: "500",
          fontFamily: "RobotoMedium",
          textTransform: "capitalize",
        };
      case "body":
        return {
          ...baseStyle,
          fontSize: 13,
          fontWeight: "400",
          letterSpacing: 0.5,
          marginBottom: 4,
          textTransform: "capitalize",
        };
    }
  };
  /* Get the styles based on the variant */
  return <Text style={[getVariantStyle(), style]} {...props}>{children}</Text>;
};

export default StyledText;
