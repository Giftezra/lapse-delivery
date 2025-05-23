import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import HomeCompoment from "@/app/components/accounts/manage-account/HomeCompoment";
import PersonalInfoComponent from "@/app/components/accounts/manage-account/PersonalInfoComponent";
import SecurityComponent from "@/app/components/accounts/manage-account/SecurityComponent";
import PrivacyAndDataComponent from "@/app/components/accounts/manage-account/PrivacyAndDataComponent";
import { ScrollView } from "react-native-gesture-handler";

const AccountManageScreen = () => {
  const title = ["Home", "Personal Info", "Security", "Privacy & Data"];
  const [selectedTitle, setSelectedTitle] = useState<string>(title[0]);

  const handleTitlePress = (title: string) => {
    setSelectedTitle(title);
  };
  return (
    <View style={styles.maincontainer}>
      {/* Display the router back button if the router can go back. Wrap the button in a pressable component  */}
      {router.canGoBack() && (
        <Pressable onPress={() => router.back()} style={styles.header}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          <StyledText children="Manage Account" variant="h3" />
        </Pressable>
      )}

      <ScrollView
        style={styles.mainsection}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          {title.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.titleItem,
                {
                  borderBottomWidth: selectedTitle === item ? 2 : 1,
                  borderBottomColor: selectedTitle === item ? "#000" : "#666",
                },
              ]}
              onPress={() => handleTitlePress(item)}
            >
              <StyledText children={item} variant="h6" />
            </Pressable>
          ))}
        </View>

        {/* Display the selected title content here */}
        <View style={styles.contentContainer}>
          {selectedTitle === "Home" && (
            <HomeCompoment
              name="John Doe"
              email="john.doe@example.com"
              image={require("@/assets/images/user_image.jpg")}
            />
          )}
          {selectedTitle === "Personal Info" && (
            <PersonalInfoComponent
              name="John Doe"
              phoneNumber="1234567890"
              email="john.doe@example.com"
              profileImage={require("@/assets/images/user_image.jpg")}
            />
          )}
          {selectedTitle === "Security" && <SecurityComponent />}
          {selectedTitle === "Privacy & Data" && <PrivacyAndDataComponent />}
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountManageScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 5,
  },
  mainsection: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 10,
  },
  titleItem: {
    padding: 5,
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
  },
});
