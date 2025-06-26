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
import { router } from "expo-router";

const DashboardScreen = () => {
  const [isSideComponentVisible, setIsSideComponentVisible] = useState(false);
  const bottomRef = useRef<BottomSheet>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const screenWidth = Dimensions.get("window").width;

  // Create  a snap point for the bottom sheet
  const snapPoints = useMemo(() => ["10%", "50%", "75%"], []);

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
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={[styles.page, { width: screenWidth }]}>
              <View style={styles.componentContainer}>
                <LastTripComponent
                  amount={4.38}
                  currency={"€"}
                  day={"May 17,"}
                  time={"10:00 AM"}
                  onHelpPressed={() => {
                    router.push("/main/screens/help/HelpScreen");
                  }}
                  onSeeEarningsActivity={() => {
                    router.push("/main/screens/earnings/EarningScreen");
                  }}
                />
              </View>
            </View>
            <View style={[styles.page, { width: screenWidth }]}>
              <View style={styles.componentContainer}>
                <TodaysComponent
                  amount={25.5}
                  currency={"€"}
                  trips={3}
                  onSeeWeeklySummary={() => {
                    router.push("/main/screens/earnings/EarningDetailsScreen");
                  }}
                />
              </View>
            </View>
          </ScrollView>

          {/* Display the pagination dots */}
          <View style={styles.paginationDots}>
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
          </View>
        </View>

        {/* Main map view */}
        <View style={styles.mapContainer}></View>

        {/* Floating action buttons */}
        <View style={styles.floatingButtonsContainer}>
          <Pressable
            style={styles.overlayShieldSheet}
            onPress={() => bottomRef.current?.expand()}
          >
            <MaterialIcons name="shield" size={25} color="#0e9ee6" />
          </Pressable>

          <Pressable
            style={[
              styles.overlayGoOnlineButton,
              isOnline && styles.overlayGoOfflineButton,
            ]}
            onPress={() => setIsOnline(!isOnline)}
          >
            <View style={{ alignItems: "center" }}>
              {isOnline ? (
                <View style={styles.innerGoOfflineButton}>
                  <MaterialIcons name="stop" size={30} color="white" />
                </View>
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

        {/* Bottom sheet */}
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
            <BottomSheetHeader onlineStatus={isOnline} />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>

      {/* Side menu component */}
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
  mapContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  overlayMenuButtons: {
    position: "absolute",
    top: 5,
    left: 15,
    borderRadius: 40,
    padding: 8,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2000,
  },
  overlayMenuContainer: {
    width: 300,
    height: "100%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: "30%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1000,
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
  overlayGoOfflineButton: {
    backgroundColor: "red",
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
    top: 40,
    width: "100%",
    alignItems: "center",
    zIndex: 1000,
    pointerEvents: "box-none",
  },
  stopButtonContainer: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
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
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  page: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  componentContainer: {
    width: "85%",
    alignItems: "center",
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dotContainer: {
    padding: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0e9ee6",
    width: 8,
    height: 8,
  },
});
