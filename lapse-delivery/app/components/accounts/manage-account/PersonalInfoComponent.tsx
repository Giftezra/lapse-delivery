import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";

interface PersonalInfoProps {
  name: string;
  phoneNumber: string;
  email: string;
  profileImage?: any;
}

const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({
  name,
  phoneNumber,
  email,
  profileImage,
}) => {
  return (
    <View style={styles.container}>
      <StyledText variant="labelMedium" children="Personal info" style={styles.title} />

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image
            source={
              typeof profileImage === "string"
                ? { uri: profileImage }
                : profileImage
            }
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.defaultProfileImage} />
        )}
      </View>

      {/* Name Section */}
      <TouchableOpacity style={styles.infoSection}>
        <View style={styles.infoContent}>
          <StyledText variant="labelMedium" children="Name" />
          <StyledText variant="labelSmall" children={name} />
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      {/* Phone Number Section */}
      <TouchableOpacity style={styles.infoSection}>
        <View style={styles.infoContent}>
          <StyledText variant="labelMedium" children="Phone number" />
          <StyledText variant="labelSmall" children={phoneNumber} />
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      {/* Email Section */}
      <TouchableOpacity style={styles.infoSection}>
        <View style={styles.infoContent}>
          <StyledText variant="labelMedium" children="Email" />
          <StyledText variant="labelSmall" children={email}  /> 
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      {/* Language Section */}
      <TouchableOpacity style={styles.infoSection}>
        <View style={styles.infoContent}>
          <StyledText variant="labelMedium" children="Language" />
          <StyledText variant="labelSmall" children="Update device language" />
        </View>
        <Ionicons name="open-outline" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
  title: {
    marginBottom: 24,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e1e1e1",
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  infoContent: {
    flex: 1,
    gap:5
  },    
});

export default PersonalInfoComponent;
