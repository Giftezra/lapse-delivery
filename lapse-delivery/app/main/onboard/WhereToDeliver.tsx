import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import StyledText from "@/app/components/helpers/others/StyledText";
import StyledTextInput from "@/app/components/helpers/others/StyledTextInput";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import { router } from "expo-router";

const WhereToDeliver = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleNext = () => {
    router.push("/main/onboard/DeliveryChoiceScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StyledText style={styles.title} variant="labelMedium">
          Where do you want to deliver?
        </StyledText>
        <View style={styles.inputContainer} >
          <StyledTextInput
            label="Delivery City"
            placeholder="Enter your city"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            variant="secondary"
          />
        </View>

        <StyledButton
          title="Next"
          variant="primary"
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default WhereToDeliver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 24,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    width: "100%",
  },
  button: {
    marginTop: 16,
  },
});
