import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import StyledText from "./components/helpers/others/StyledText";
import { LinearTransition } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const { width } = Dimensions.get("window");

export default function Index() {
  const cardColors = useThemeColor({}, "cards");
  const backgroundColor = useThemeColor({}, "background");
  const buttonColors = useThemeColor({}, "buttons");
  const borderColor = useThemeColor({}, "borders");
  const tintColor = useThemeColor({}, "tint");
  const highlightColor = useThemeColor({}, "highlight");
  const secondaryButtonColor = useThemeColor({}, "secondaryButtons");

  const benefits = [
    {
      icon: "💰",
      title: "Earn More",
      description: "Competitive pay rates and bonuses",
    },
    {
      icon: "⏰",
      title: "Flexible Hours",
      description: "Work when you want, where you want",
    },
    {
      icon: "📱",
      title: "Easy App",
      description: "Simple interface to manage deliveries",
    },
    {
      icon: "🚗",
      title: "Quick Payouts",
      description: "Get paid weekly with instant transfers",
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <StyledText
            style={[styles.heroTitle]}
            children="Start Earning"
            variant="titleLarge"
          />
          <StyledText
            style={[styles.heroDescription]}
            children={
              "Join our network of delivery partners and start earning money on your own schedule. Deliver orders from local restaurants and stores in your area."
            }
            variant="bodyMedium"
          />
        </View>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <StyledText
          style={[styles.sectionTitle]}
          children="Why Drive With Us"
          variant="titleLarge"
        />
        <View style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <LinearGradient
              colors={[buttonColors, cardColors]}
              style={styles.benefitCard}
              start={{ x: 2, y: 4 }}
              end={{ x: 1, y: 1 }}
            >
              <View key={index}>
                <StyledText
                  style={styles.benefitIcon}
                  children={benefit.icon}
                />
                <StyledText
                  style={[styles.benefitTitle]}
                  children={benefit.title}
                />
                <StyledText
                  style={[styles.benefitDescription]}
                  children={benefit.description}
                />
              </View>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Requirements Section */}
      <View style={styles.requirementsSection}>
        <StyledText
          style={[styles.sectionTitle]}
          children="Requirements"
          variant="titleMedium"
        />
        <LinearGradient
          colors={[cardColors, borderColor]}
          style={styles.requirementsCard}
          start={{ x: 2, y: 4 }}
          end={{ x: 1, y: 1 }}
        >
          <React.Fragment>
            <View style={styles.requirementItem}>
              <StyledText style={styles.requirementIcon} children="📱" />
              <StyledText children="Smartphone with GPS" variant="bodyMedium" />
            </View>
            <View style={styles.requirementItem}>
              <StyledText style={styles.requirementIcon} children="🚗" />
              <StyledText
                children="Vehicle (car, bike, or scooter)"
                variant="bodyMedium"
              />
            </View>
            <View style={styles.requirementItem}>
              <StyledText style={styles.requirementIcon} children="📄" />
              <StyledText
                children="Valid ID and background check"
                variant="bodyMedium"
              />
            </View>
            <View style={styles.requirementItem}>
              <StyledText style={styles.requirementIcon} children="🎯" />
              <StyledText children="18+ years old" variant="bodyMedium" />
            </View>
          </React.Fragment>
        </LinearGradient>
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={[tintColor, cardColors]}
        style={styles.ctaSection}
        start={{ x: 2, y: 4 }}
        end={{ x: 1, y: 1 }}
      >
        <>
          <View style={[styles.ctaCard]}>
            <StyledText
              style={styles.ctaTitle}
              children="Ready to Start?"
              variant="titleMedium"
            />
            <StyledText
              style={styles.ctaDescription}
              children={
                "Complete your profile and start accepting delivery requests in minutes"
              }
              variant="bodyMedium"
            />

            <View style={styles.buttonContainer}>
              <LinearGradient
                colors={[buttonColors, tintColor]}
                style={[styles.buttons]}
                start={{ x: 2, y: 4 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/main/onboard/WhereToDeliver")}
                >
                  <StyledText
                    style={[styles.primaryButtonText]}
                    children="Get Started"
                  />
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={[secondaryButtonColor, highlightColor]}
                style={[styles.buttons, { borderColor, borderWidth: 1 }]}
                start={{ x: 2, y: 4 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/main/onboard/WhereToDeliver")}
                >
                  <StyledText
                    style={[styles.secondaryButtonText]}
                    children="Learn More"
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </>
      </LinearGradient>

      {/* Footer */}
      <View style={styles.footer}>
        <StyledText
          style={[styles.footerText]}
          children="© 2024 Lapse Delivery Partner App"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    minHeight: 300,
  },
  heroContent: {
    flex: 1,
    paddingRight: 20,
  },
  heroTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroDescription: {
    lineHeight: 24,
    opacity: 0.8,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "center",
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  benefitDescription: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },
  requirementsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  requirementsCard: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  requirementIcon: {
    fontSize: 18,
    marginRight: 16,
  },

  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  ctaCard: {
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
  },
  ctaTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  ctaDescription: {
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.9,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  primaryButtonText: {
    fontWeight: "600",
    textAlign: "center",
  },
  buttons: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 120,
    ...Platform.select({
      ios: {
        shadowColor: "red",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      default: {
        elevation: 4,
      },
    }),
  },
  secondaryButtonText: {
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
