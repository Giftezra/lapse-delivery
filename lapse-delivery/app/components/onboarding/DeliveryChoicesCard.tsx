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
import { DeliveryOptionsChoicesInterface } from "@/app/interfaces/Onboarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";

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
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  const getVehicleIcon = () => {
    switch (vehicle) {
      case "Bike":
        return "bike";
      case "Car":
        return "car";
      default:
        return "motorbike";
    }
  };

  const getThemeColors = () => {
    switch (vehicle) {
      case "Bike":
        return {
          primary: selected ? "#0D7A3E" : "#FFFFFF",
          secondary: "#E8F5ED",
          accent: "#15B65D",
        };
      case "Car":
        return {
          primary: selected ? "#1E40AF" : "#FFFFFF",
          secondary: "#EEF2FF",
          accent: "#3B82F6",
        };
      default:
        return {
          primary: selected ? "#7E22CE" : "#FFFFFF",
          secondary: "#F5F3FF",
          accent: "#A855F7",
        };
    }
  };

  const colors = getThemeColors();
  const textColor = selected ? "#FFFFFF" : "#1F2937";
  const subtextColor = selected ? "#E5E7EB" : "#6B7280";

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.cardWrapper}
      activeOpacity={0.95}
    >
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: colors.primary },
          selected && styles.selectedContainer,
        ]}
      >
        <View style={styles.headerSection}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: selected
                  ? "rgba(255,255,255,0.15)"
                  : colors.secondary,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={getVehicleIcon()}
              size={28}
              color={selected ? "#FFFFFF" : colors.accent}
            />
          </View>
          <View style={styles.titleSection}>
            <StyledText
              variant="labelMedium"
              style={[styles.title, { color: textColor }]}
            >
              {title}
            </StyledText>
            <View style={styles.badgeContainer}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: selected
                      ? "rgba(255,255,255,0.15)"
                      : colors.secondary,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="clock-time-four"
                  size={14}
                  color={selected ? "#FFFFFF" : colors.accent}
                />
                <Text
                  style={[
                    styles.badgeText,
                    { color: selected ? "#FFFFFF" : colors.accent },
                  ]}
                >
                  Start Today
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <MaterialCommunityIcons
                name="account"
                size={16}
                color={subtextColor}
              />
              <Text style={[styles.detailText, { color: subtextColor }]}>
                {age}+ years
              </Text>
            </View>
            {vehicle !== "Bike" && description && (
              <View style={styles.detail}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={16}
                  color={subtextColor}
                />
                <Text style={[styles.detailText, { color: subtextColor }]}>
                  Insurance Required
                </Text>
              </View>
            )}
          </View>

          <View style={styles.detailRow}>
            {license && (
              <View style={styles.detail}>
                <MaterialCommunityIcons
                  name="license"
                  size={16}
                  color={subtextColor}
                />
                <Text style={[styles.detailText, { color: subtextColor }]}>
                  License Required
                </Text>
              </View>
            )}
            {expierience && (
              <View style={styles.detail}>
                <MaterialCommunityIcons
                  name="star"
                  size={16}
                  color={subtextColor}
                />
                <Text style={[styles.detailText, { color: subtextColor }]}>
                  {expierience} exp.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryChoicesCard;

const styles = StyleSheet.create({
  cardWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mainContainer: {
    flex:1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 5,
  },
  selectedContainer: {
    borderWidth: 0,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  detailsSection: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
