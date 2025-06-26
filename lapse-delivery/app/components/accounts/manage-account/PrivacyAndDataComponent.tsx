import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StyledText from "../../helpers/others/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PrivacyAndDataComponent = () => {
  return (
    <View style={styles.maincontainer}>
      <StyledText children="Privacy & Data" variant="headlineMedium" />

      <View style={styles.contentcontainer}>
        <StyledText children="Privacy" variant="titleLarge" style={styles.title} />

        <TouchableOpacity style={styles.buttoncontainer}>
          <View style={styles.buttonInner}>
            <StyledText children="Privacy Center" variant="labelLarge" />
            <StyledText
              children="Take control of your privacy and learn more about how we collect and use your data."
              variant="labelSmall"
            />
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivacyAndDataComponent;

const styles = StyleSheet.create({
  maincontainer:{
    flex:1,
    padding:10,
  },
  contentcontainer:{
    flex:1,
    padding:10,
    backgroundColor:"#f0f0f0",
    borderRadius:10,
  },
  title:{
    marginBottom:10,
    paddingVertical:10,
  },

  buttoncontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  buttonInner:{
    padding:5,
    gap:10,
  }
});
