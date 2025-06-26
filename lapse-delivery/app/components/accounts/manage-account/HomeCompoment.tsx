import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";

interface HomeCompomentProps {
  name: string;
  email: string;
  image?: any;
  onPress?: (item: string) => void;
}

/* Create a component to display the content of this home in a card view */
const HomeCard = ({ title, onPress }: { title: string; onPress?: (item: string) => void }) => {
  return (
    <TouchableOpacity style={styles.homecardcontainer} onPress={() => onPress?.(title)}>
      <MaterialCommunityIcons
        name={
          title === "Personal info"
            ? "account"
            : title === "Security"
            ? "shield-check"
            : title === "Privacy & Data"
            ? "lock"
            : "account"
        }
        size={24}
        color="black"
      />
      <StyledText children={title} variant="labelMedium" />
    </TouchableOpacity>
  );
};

const HomeCompoment = ({ name, email, image, onPress }: HomeCompomentProps) => {

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.profileImage}
        />
        <StyledText variant="titleLarge" style={styles.name}>
          {name}
        </StyledText>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <HomeCard title="Personal Info" onPress={()=> onPress?.("Personal info")} />
        <HomeCard title="Security" onPress={()=> onPress?.("Security")} />
        <HomeCard title="Privacy & Data" onPress={()=> onPress?.("Privacy & Data")} />
      </View>

      {/* Suggestions Section */}
      <View style={styles.suggestionsSection}>
        <StyledText variant="labelMedium" children="Suggestions" style={styles.sectionTitle} />

        <TouchableOpacity style={styles.checkupCard}>
          <View style={styles.checkupContent}>
            <View>
              <StyledText variant="labelMedium" children="Complete your account checkup" />

              <StyledText variant="labelSmall" children="Complete your account checkup to make Uber work better for you and keep you secure." style={styles.checkupDescription} />
            </View>
            <MaterialCommunityIcons
              name="card-account-details"
              size={24}
              color="#4285F4"
            />  
          </View>
          <TouchableOpacity style={styles.beginButton}>
            <StyledText variant="labelMedium" children="Begin checkup" style={styles.beginButtonText} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCompoment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: "#666",
    fontSize: 16,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  homecardcontainer: {
    padding: 15,
    alignItems: "center",
    gap: 5,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  suggestionsSection: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 16,

  },
  checkupCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkupContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkupDescription: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
    maxWidth: "90%",
  },
  beginButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  beginButtonText: {
    color: "#000",
    fontWeight: "500",
  },
});
