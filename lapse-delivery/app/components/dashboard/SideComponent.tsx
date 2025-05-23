import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import StyledText from "../helpers/others/StyledText";
import SideComponentInterface from "@/app/interfaces/SideComponent";

interface SideComponentProps extends SideComponentInterface {
  isSideComponentVisible: boolean;
  setIsSideComponentVisible: (isSideComponentVisible: boolean) => void;
}

const SideComponent = ({
  name,
  image,
  isSideComponentVisible,
  setIsSideComponentVisible,
}: SideComponentProps) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.profileImage}
        />
        <StyledText children={name} variant="h5" />
      </View>

      <View style={styles.sectionContainer}>
        <StyledText
          children="inbox"
          variant="h2"
          onPress={() => {
            router.push("" as any);
            setIsSideComponentVisible(false);
          }}
        />
        <StyledText
          children="Referals"
          variant="h2"
          onPress={() => {
            router.push("" as any);
            setIsSideComponentVisible(false);
          }}
        />
        <StyledText
          children="Missons"
          variant="h2"
          onPress={() => {
            router.push("" as any);
            setIsSideComponentVisible(false);
          }}
        />
        <StyledText
          children="Earnings"
          variant="h2"
          onPress={() => {
            router.push("/main/screens/EarningScreen");
            setIsSideComponentVisible(false);
          }}
        />
        <StyledText
          children="Wallet"
          variant="h2"
          onPress={() => {
            router.push("/main/screens/WalletScreen");
            setIsSideComponentVisible(false);
          }}
        />
        <StyledText
          children="Account"
          variant="h2"
          onPress={() => {
            router.push("/main/screens/accounts/AccountScreen");
            setIsSideComponentVisible(false);
          }}
        />
      </View>

      <View style={styles.footerContainer}>
        <StyledText children="Help" variant="h6" />
        <StyledText children="Info" variant="h6" />
      </View>
    </View>
  );
};

export default SideComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  sectionContainer: {
    flex: 1,
    gap: 20,
    paddingVertical: 20,
  },
  footerContainer: {
    gap: 10,
    paddingBottom: 20,
  },
});
