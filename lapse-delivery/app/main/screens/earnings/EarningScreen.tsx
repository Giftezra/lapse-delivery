import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import { ScrollView } from "react-native-gesture-handler";
import WeeklyEarningComponent from "@/app/components/earninngs/WeeklyEarningComponent";
import EarningChartcomponent from "@/app/components/earninngs/EarningChartcomponent";
import OnlineDurationComponent from "@/app/components/earninngs/OnlineDurationComponent";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import EarningBalanceComponent from "@/app/components/earninngs/EarningBalanceComponent";
import Button from "react-native-paper";

const sampleChartData = [
  { value: 45, label: "S" },
  { value: 65, label: "M" },
  { value: 55, label: "T" },
  { value: 75, label: "W" },
  { value: 85, label: "T" },
  { value: 95, label: "F" },
  { value: 60, label: "S" },
];

const EarningScreen = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const barContainerWidth = useRef(0);
  return (
    <View style={styles.maincontainer}>
      <ScrollView
        style={styles.maincontainer}
        onScroll={({ nativeEvent }) => {
          setIsScrolled(nativeEvent.contentOffset.y > 0);
        }}
      >
        {/* Display the weekly earning component */}
        <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
          <View>
            <WeeklyEarningComponent
              dayFrom="May 12"
              dayTo="May 18"
              currency="$"
              current_earning={100}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: "center" }}
            onLayout={(event) => {
              barContainerWidth.current = event.nativeEvent.layout.width;
            }}
          >
            <EarningChartcomponent
              data={sampleChartData}
              barContainerWidth={barContainerWidth.current}
            />
          </View>
        </View>

        <View style={styles.section}>
          <OnlineDurationComponent
            duration="13h 30m"
            trips={10}
            points={10}
            onPress={() => {}}
          />

          {/* Display the balance section */}
          <EarningBalanceComponent
            balance={100}
            currency="$"
            date="May 18"
            onSummaryPress={() => {
              router.push("/main/screens/earnings/EarningDetailsScreen");
            }}
            onPress={() => {
              router.push("/main/screens/wallet/WalletScreen");
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, padding: 10, justifyContent: "space-evenly" }}>
          <MaterialIcons name="analytics" size={24} color="black" />
          <StyledText children="See map of earning trend" variant="labelMedium" />
        </View>

        {/* Navigate to the earnings details screen with a button */}
        <StyledButton
          title="View Details"
          onPress={() => {
            router.push("/main/screens/earnings/EarningDetailsScreen");
          }}
          variant="secondary"
        />
      </ScrollView>
    </View>
  );
};

export default EarningScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 5,
  },
  section: {
    gap: 10,
    padding: 10,
  },
});
