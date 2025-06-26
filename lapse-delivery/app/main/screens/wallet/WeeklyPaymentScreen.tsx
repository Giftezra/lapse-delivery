import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "@/app/components/helpers/others/StyledText";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WalletPaymentDetailsInterface from "@/app/interfaces/WalletInterface";
import { Icon } from "react-native-paper";

const weeklyPaymentData: WalletPaymentDetailsInterface = {
  currency: "$",
  paid_amount: 100,
  payable_amount: 100,
  transfer_fee: 5,
  transfer_fee_tax: 10,
  status: "success",
  date: "May 17",
  time: "10:00 AM",
};

/* Calculate the total amount paid out */
const total =
  weeklyPaymentData.payable_amount -
  weeklyPaymentData.transfer_fee -
  weeklyPaymentData.transfer_fee_tax;

const DetailsRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.detailsRow}>
      <StyledText
        children={label}
        variant="titleMedium"
        style={{ textTransform: "capitalize", fontWeight: "500" }}
      />
      <StyledText
        children={value}
        variant="titleMedium"
        style={{ textTransform: "lowercase", fontWeight: "bold" }}
      />
    </View>
  );
};

const WeeklyPaymentScreen = () => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.heading}>
        {router.canGoBack() && (
          <Pressable onPress={() => router.back()} style={{ padding: 5 }}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        )}
        <StyledText children="Weekly Payment Details" variant="titleMedium" />
      </View>

      <View style={styles.maincontert}>
        <StyledText
          children="Transferred to your bank account"
          variant="titleMedium"
          style={{ textTransform: "capitalize" }}
        />
        <StyledText
          children={`-${weeklyPaymentData.currency}${weeklyPaymentData.paid_amount}`}
          variant="displayMedium"
          style={{ textTransform: "capitalize", fontWeight: "bold" }}
        />

        {/* Display the details of the payment */}
        <View style={styles.detailsContainer}>
          <DetailsRow label="Transfer amount" value={`${weeklyPaymentData.currency}${weeklyPaymentData.payable_amount}`} />
          <DetailsRow label="Transfer fee" value={`${weeklyPaymentData.currency}${weeklyPaymentData.transfer_fee}`} />
          <DetailsRow label="Transfer fee tax" value={`${weeklyPaymentData.currency}${weeklyPaymentData.transfer_fee_tax}`} />
          <DetailsRow label="Total amount" value={`${weeklyPaymentData.currency}${total}`} />
        </View>

        {/* Display the status of the payment */}
        <View style={styles.statusContainer}>
          <StyledText children='status' variant='titleMedium' style={{textTransform:'capitalize', fontWeight:'500'}} />
          <StyledText children={weeklyPaymentData.status} variant='titleMedium' style={{textTransform:'capitalize'}} />
        </View>

        <View style={styles.dateContainer}>
          <StyledText children='Date and Time' variant='titleMedium' style={{textTransform:'capitalize', fontWeight:'500'}} />
          <StyledText children={`${weeklyPaymentData.date} at ${weeklyPaymentData.time}`} variant='titleMedium' style={{fontWeight:'600'}} />
        </View>
      </View>

      {/* Display the get help button */}
      <Pressable style={styles.helpButton} onPress={() => router.push("/main/screens/help/HelpScreen")}>
        <Icon source="help-circle" size={24} color="black" />
        <StyledText children="Get help" variant="titleMedium" style={{textTransform:'capitalize', fontWeight:'500'}} />
      </Pressable>
    </View>
  );
};

export default WeeklyPaymentScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
    marginBottom: 100,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  maincontert: {
    flex: 1,
    marginTop: 50,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 5,
  },
  statusContainer: {
    marginTop: 20,
    padding: 10,
  },
  dateContainer: {
    marginTop: 20,
    padding: 10,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
});
