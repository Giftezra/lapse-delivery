import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import StyledText from "@/app/components/helpers/others/StyledText";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <StyledText variant="labelLarge" style={styles.settingTitle}>
        {title}
      </StyledText>
      {subtitle && (
        <StyledText variant="labelSmall" style={styles.settingSubtitle}>
          {subtitle}
        </StyledText>
      )}
    </View>
  </Pressable>
);

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </Pressable>
        <StyledText variant="headlineMedium" style={styles.headerTitle}>
          App Settings
        </StyledText>
      </View>

      {/* Settings List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="volume-high"
              size={24}
              color="black"
            />
          }
          title="Sounds and Voice"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons name="navigation" size={24} color="black" />
          }
          title="Navigation"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="account-box-outline"
              size={24}
              color="black"
            />
          }
          title="Accessibility"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="black"
            />
          }
          title="Communication"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={24}
              color="black"
            />
          }
          title="Night mode"
          subtitle="Always Off"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={24}
              color="black"
            />
          }
          title="Follow My Ride"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="phone-alert"
              size={24}
              color="black"
            />
          }
          title="Emergency Contacts"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="speedometer"
              size={24}
              color="black"
            />
          }
          title="Speed limit"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="shield-check"
              size={24}
              color="black"
            />
          }
          title="RideCheck"
        />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#000000",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
