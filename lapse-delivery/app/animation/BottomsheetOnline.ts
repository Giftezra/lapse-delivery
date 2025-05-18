import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useOnlineAnimation = (isOnline: boolean) => {
  const translateX = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (isOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -400,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (!isOnline) {
      translateX.setValue(-400);
    }
  }, [isOnline]);

  return translateX;
};
