import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import LastTripComponent from "@/app/components/dashboard/LastTripComponent";
import SideComponent from "@/app/components/dashboard/SideComponent";
import BottomSheetHeader from "@/app/components/dashboard/BottomSheetHeader";
import TodaysComponent from "@/app/components/dashboard/TodaysComponent";
import dashboardUtils from "@/app/utils/dashboard";
import { AppleMaps, GoogleMaps } from "expo-maps";

const DashboardScreen = () => {
  const [isSideComponentVisible, setIsSideComponentVisible] = useState(false);
  const bottomRef = useRef<BottomSheet>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Create  a snap point for the bottom sheet
  const snapPoints = useMemo(() => ["26%", "75%", "100%"], []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setIsSideComponentVisible(false)}
    >
      <GestureHandlerRootView style={styles.container}>
        <Pressable
          style={styles.overlayMenuButtons}
          onPress={() => setIsSideComponentVisible(!isSideComponentVisible)}
        >
          <MaterialCommunityIcons name="menu" size={30} />
        </Pressable>

        {/* Display the last trip component */}
        <View style={styles.overlayEarningsSection}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) =>
              dashboardUtils.handleScroll(event, setActiveIndex)
            }
            scrollEventThrottle={16}
          >
            <View
              style={[
                styles.page,
                { width: Dimensions.get("window").width * 0.95 },
              ]}
            >
              <LastTripComponent
                amount={4.38}
                currency={"€"}
                day={"May 17,"}
                time={"10:00 AM"}
                onHidePressed={() => {}}
              />
            </View>
            <View
              style={[
                styles.page,
                { width: Dimensions.get("window").width * 0.95 },
              ]}
            >
              <TodaysComponent
                amount={25.5}
                currency={"€"}
                trips={3}
                onSeeWeeklySummary={() => {}}
              />
            </View>
          </ScrollView>

          {/* <View style={styles.paginationDots}>
            <Pressable
              onPress={() =>
                dashboardUtils.handleDotPress(0, scrollViewRef, setActiveIndex)
              }
              style={styles.dotContainer}
            >
              <View
                style={[styles.dot, activeIndex === 0 && styles.activeDot]}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                dashboardUtils.handleDotPress(1, scrollViewRef, setActiveIndex)
              }
              style={styles.dotContainer}
            >
              <View
                style={[styles.dot, activeIndex === 1 && styles.activeDot]}
              />
            </Pressable>
          </View> */}
        </View>

        {/* This is the main view that holds the backround display */}
        <View>
        </View>

        {/* bottom sheet with integrated buttons */}
        <BottomSheet
          ref={bottomRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          index={0}
          enableOverDrag={false}
          enableDynamicSizing={false}
          handleIndicatorStyle={{ backgroundColor: "#E5E5E5", width: 50 }}
          enableHandlePanningGesture
        >
          <BottomSheetView>
            {/* Action buttons moved inside BottomSheet */}
            <View style={styles.bottomSheetButtons}>
              <Pressable
                style={styles.overlayShieldSheet}
                onPress={() => bottomRef.current?.expand()}
              >
                <MaterialIcons name="shield" size={25} color="#0e9ee6" />
              </Pressable>

              <Pressable
                style={styles.overlayGoOnlineButton}
                onPress={() => setIsOnline(!isOnline)}
              >
                <View style={{ alignItems: "center" }}>
                  {isOnline ? (
                    <MaterialIcons name="power-off" size={30} color="white" />
                  ) : (
                    <MaterialIcons
                      name="power-settings-new"
                      size={30}
                      color="white"
                    />
                  )}
                </View>
              </Pressable>

              <Pressable
                style={styles.overlayAnalyticsSection}
                onPress={() => bottomRef.current?.expand()}
              >
                <MaterialIcons name="analytics" size={25} color="#0e9ee6" />
              </Pressable>
            </View>
            <BottomSheetHeader onlineStatus={isOnline} />

            <View style={styles.goofflineButtonContainer}>
              <Pressable style={styles.goofflineButton}>
                <View style={styles.innerGoOfflineButton}>
                  <MaterialIcons name="stop" size={30} color="white" />
                </View>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>

      {/* Display the side comopnent when the user clicks on the overlay menu button */}
      {isSideComponentVisible && (
        <View style={styles.overlayMenuContainer}>
          <SideComponent
            name="John Doe"
            image={require("@/assets/images/moutainimage.jpg")}
            isSideComponentVisible={isSideComponentVisible}
            setIsSideComponentVisible={setIsSideComponentVisible}
          />
        </View>
      )}
    </Pressable>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  overlayMenuButtons: {
    position: "absolute",
    top: 15,
    left: 15,
    borderRadius: 40,
    padding: 8,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlayMenuContainer: {
    width: 500,
    height: "100%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlayShieldSheet: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlayGoOnlineButton: {
    width: 80,
    height: 80,
    backgroundColor: "#0e9ee6",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlayAnalyticsSection: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlayEarningsSection: {
    position: "absolute",
    top: 5,
    borderRadius: 20,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.95,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    minHeight: 100,
  },
  map: {
    flex: 1,
  },
  bottomSheetButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  goofflineButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  goofflineButton: {
    borderRadius: 40,
    padding: 15,
    backgroundColor: "red",
    borderWidth: 0.5,
  },
  innerGoOfflineButton: {
    alignItems: "center",
    padding: 5,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "gray",
  },
  page: {
    flex: 1,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  dotContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#0e9ee6",
  },
});
