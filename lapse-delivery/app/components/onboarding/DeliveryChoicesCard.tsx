import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DeliveryOptionsChoicesInterface } from "@/app/interfaces/onboarding/OnboardingInterfaces";
import StyledText from "@/app/components/helpers/others/StyledText";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColor } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window");

const DeliveryChoicesCard = ({
  title,
  age,
  description,
  license,
  expierience,
  vehicle,
  onPress,
  selected,
}: DeliveryOptionsChoicesInterface) => {
  const cardColor = useThemeColor({}, "cards");

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  const getVehicleIcon = () => {
    switch (vehicle) {
      case "bicycle":
        return "bike";
      case "car":
        return "car";
      default:
        return "motorbike";
    }
  };

  const getThemeColors = () => {
    switch (vehicle) {
      case "bicycle":
        return {
          primary: selected ? "#10B981" : "#FFFFFF",
          secondary: "#ECFDF5",
          accent: "#059669",
          gradient: selected ? (["#10B981", cardColor] as const) : undefined,
        };
      case "car":
        return {
          primary: selected ? "#3B82F6" : "#FFFFFF",
          secondary: "#EFF6FF",
          accent: "#2563EB",
          gradient: selected ? (["#3B82F6", cardColor] as const) : undefined,
        };
      default:
        return {
          primary: selected ? "#8B5CF6" : "#FFFFFF",
          secondary: "#F3F4F6",
          accent: "#7C3AED",
          gradient: selected ? (["#8B5CF6", cardColor] as const) : undefined,
        };
    }
  };

  const colors = getThemeColors();

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.cardWrapper}
      activeOpacity={0.8}
    >
      {selected ? (
        <LinearGradient
          colors={colors.gradient!}
          style={[styles.mainContainer, styles.selectedContainer]}
          start={{ x: 2, y: 2 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.headerSection}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              ]}
            >
              <MaterialCommunityIcons
                name={getVehicleIcon()}
                size={32}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.titleSection}>
              <StyledText
                variant="labelLarge"
                style={[styles.title, { color: "#FFFFFF" }]}
                children={title}
              />
              <View style={styles.badgeContainer}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={14}
                    color="#FFFFFF"
                  />
                  <StyledText
                    style={[styles.badgeText, { color: "#FFFFFF" }]}
                    children="Start Today"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detail}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "rgba(255,255,255,0.1)" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
                <StyledText
                  style={[styles.detailText, { color: "#E5E7EB" }]}
                  children={`${age}+ years`}
                />
              </View>
              {vehicle !== "bicycle" && description && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "rgba(255,255,255,0.1)" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="shield-check"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#E5E7EB" }]}
                    children="Insurance Required"
                  />
                </View>
              )}
            </View>

            <View style={styles.detailRow}>
              {license && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "rgba(255,255,255,0.1)" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="card-account-details"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#E5E7EB" }]}
                    children="License Required"
                  />
                </View>
              )}
              {expierience && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "rgba(255,255,255,0.1)" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="star"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#E5E7EB" }]}
                    children={`${expierience} exp.`}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.selectedIndicator}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="#FFFFFF"
            />
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.mainContainer, { backgroundColor: cardColor }]}>
          <View style={styles.headerSection}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: colors.secondary,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={getVehicleIcon()}
                size={32}
                color={colors.accent}
              />
            </View>
            <View style={styles.titleSection}>
              <StyledText
                variant="labelLarge"
                style={[styles.title, { color: "#1F2937" }]}
                children={title}
              />
              <View style={styles.badgeContainer}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.secondary,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={14}
                    color={colors.accent}
                  />
                  <StyledText
                    style={[styles.badgeText, { color: colors.accent }]}
                    children="Start Today"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detail}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={16}
                    color={colors.accent}
                  />
                </View>
                <StyledText
                  style={[styles.detailText, { color: "#6B7280" }]}
                  children={`${age}+ years`}
                />
              </View>
              {vehicle !== "bicycle" && description && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: colors.secondary },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="shield-check"
                      size={16}
                      color={colors.accent}
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#6B7280" }]}
                    children="Insurance Required"
                  />
                </View>
              )}
            </View>

            <View style={styles.detailRow}>
              {license && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: colors.secondary },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="card-account-details"
                      size={16}
                      color={colors.accent}
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#6B7280" }]}
                    children="License Required"
                  />
                </View>
              )}
              {expierience && (
                <View style={styles.detail}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: colors.secondary },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="star"
                      size={16}
                      color={colors.accent}
                    />
                  </View>
                  <StyledText
                    style={[styles.detailText, { color: "#6B7280" }]}
                    children={`${expierience} exp.`}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DeliveryChoicesCard;

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 16,
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mainContainer: {
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
  },
  selectedContainer: {
    borderColor: "rgba(255,255,255,0.3)",
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  detailsSection: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 32,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontSize: 15,
    fontWeight: "500",
  },
  selectedIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
