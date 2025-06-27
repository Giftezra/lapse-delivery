import React from "react";
import { StyleProp, TextStyle, TextProps } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  const textColor = useThemeColor({}, "text");
  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      color: textColor,
      fontFamily: "RobotoMedium",
      fontWeight: "700",
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
