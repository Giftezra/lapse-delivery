import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";

interface HomeCompomentProps {
  name: string;
  email: string;
  image?: any;
}

/* Create a component to display the content of this home in a card view */
const HomeCard = ({ title, icon }: { title: string; icon: ReactNode }) => {
  return (
    <TouchableOpacity style={styles.homecardcontainer}>
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
      <StyledText children={title} variant="h4" />
    </TouchableOpacity>
  );
};

const HomeCompoment = ({ name, email, image }: HomeCompomentProps) => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.profileImage}
        />
        <StyledText variant="h2" style={styles.name}>
          {name}
        </StyledText>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <HomeCard title="Personal info" icon="account" />
        <HomeCard title="Security" icon="shield-check" />
        <HomeCard title="Privacy & Data" icon="lock" />
      </View>

      {/* Suggestions Section */}
      <View style={styles.suggestionsSection}>
        <StyledText variant="h4" children="Suggestions" style={styles.sectionTitle} />

        <TouchableOpacity style={styles.checkupCard}>
          <View style={styles.checkupContent}>
            <View>
              <StyledText variant="h4" children="Complete your account checkup" />

              <StyledText variant="h6" children="Complete your account checkup to make Uber work better for you and keep you secure." style={styles.checkupDescription} />
            </View>
            <MaterialCommunityIcons
              name="card-account-details"
              size={24}
              color="#4285F4"
            />  
          </View>
          <TouchableOpacity style={styles.beginButton}>
            <StyledText variant="h4" children="Begin checkup" style={styles.beginButtonText} />
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
