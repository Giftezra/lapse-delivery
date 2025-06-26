import React from "react";
import { StyleProp, TextStyle, TextProps } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface StyledTextProps extends Omit<TextProps, "style"> {
  variant?:
    | "displayLarge"
    | "displayMedium"
    | "displaySmall"
    | "headlineLarge"
    | "headlineMedium"
    | "headlineSmall"
    | "titleLarge"
    | "titleMedium"
    | "titleSmall"
    | "labelLarge"
    | "labelMedium"
    | "labelSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall";
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const StyledText: React.FC<StyledTextProps> = ({
  variant = "bodyMedium",
  children,
  style,
  ...props
}) => {
  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      color: "#000",
    };
    return baseStyle;
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      {...props}
      variant={variant as VariantProp<never>}
    >
      {children}
    </Text>
  );
};

export default StyledText;
