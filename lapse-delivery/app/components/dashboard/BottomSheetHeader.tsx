import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import { useOnlineAnimation } from "@/app/animation/BottomsheetOnline";

interface BottomSheetHeaderProps {
  onlineStatus: boolean;
}

const BottomSheetHeader = ({ onlineStatus }: BottomSheetHeaderProps) => {
  const translateX = useOnlineAnimation(onlineStatus);

  return (
    <>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#E5E5E5",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            styles.animatedLine,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
      <View style={styles.mainContainer}>
        <Pressable>
          <MaterialIcons name="settings-accessibility" size={24} />
        </Pressable>
        {onlineStatus ? (
          <View style={{ alignItems: "center" }}>
            <StyledText children="You're online" variant="h2" />
            <StyledText
              children="be patient, you'll get a delivery soon"
              variant="h6"
              style={{
                textTransform: "lowercase",
                color: "#666",
                fontWeight: "600",
                fontFamily: "BarlowLight",
              }}
            />
          </View>
        ) : (
          <StyledText children="You're offline" variant="h2" />
        )}
        <Pressable>
          <MaterialIcons name="miscellaneous-services" size={24} />
        </Pressable>
      </View>
    </>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  animatedLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#666",
    width: "100%",
  },
});
