import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
export default function Index() {
  return (
    <View>
      <Text>Hello this should hold the onboarding screen and the landing page for the app.</Text>

      <Pressable onPress={() => router.push("/main/onboard/WhereToDeliver")}>
        <Text>begin your journey</Text>
      </Pressable>
    </View>
  );
}
