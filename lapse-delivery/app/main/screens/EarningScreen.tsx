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
        {/* Display the help and back buttons */}
        <View
          style={[
            styles.rowSection,
            styles.staticHeader,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {router.canGoBack() && (
              <Pressable onPress={() => router.back()}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="black"
                />
              </Pressable>
            )}
            {/* Display the earning title if the screen is scrolled */}
            {isScrolled && <StyledText children="Earnings" variant="h5" />}
          </View>

          <Pressable style={[styles.helpButton]}>
            <MaterialCommunityIcons
              name="help-circle"
              size={24}
              color="black"
            />
            <StyledText children="Help" variant="h5" />
          </Pressable>
        </View>

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
            style={{ flex: 1, justifyContent: "center"}}
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
          <StyledButton
            title="View Details"
            onPress={() => {}}
            variant="primary"
            style={{
              backgroundColor: "rgba(244, 244, 244, 0.95)",
            }}
            textProps={{
              style: {
                color: "black",
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "BarlowRegular",
              },
            }}
          />

          {/* Display the balance section */}
          <EarningBalanceComponent
            balance={100}
            currency="$"
            onPress={() => {
              router.push("/main/screens/WalletScreen");
            }}
          />

          <StyledText children="Summary" variant="h5" />

          <View>
            <MaterialIcons name="analytics" size={24} color="black" />
          </View>
        </View>
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
  rowSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  staticHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#333",
  },
  section: {
    gap: 10,
    padding: 10,
  },
});
