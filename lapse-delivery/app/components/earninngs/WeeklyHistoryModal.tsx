import React from "react";
import { Modal, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../helpers/others/StyledText";
import {
  WeeklyHistoryModalProps,
  WeeklyHistoryItem,
} from "@/app/interfaces/EarningsInterface";

const WeeklyHistoryRow = ({
  week,
  onPress,
  isSelected,
}: {
  week: WeeklyHistoryItem;
  onPress: () => void;
  isSelected: boolean;
}) => {
  const maxBarHeight = 80; // Taller bars as per design
  const maxAmount = Math.max(...week.days.map((day) => day.amount));
  const maxHeight = maxBarHeight + 70; // Increased significantly to match the screenshot spacing

  return (
    <Pressable
      style={[
        styles.weekRow,
        isSelected && styles.selectedRow,
        { height: maxHeight },
      ]}
      onPress={onPress}
    >
      <View>
        <StyledText variant="bodyMedium" style={styles.weekRange}>
          {week.weekRange}
        </StyledText>
        <StyledText variant="titleMedium" style={styles.amount}>
          €{week.amount.toFixed(2)}
        </StyledText>
      </View>
      <View style={styles.chartContainer}>
        {week.days.map((day, index) => (
          <View key={index} style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                {
                  height:
                    day.amount > 0
                      ? (day.amount / maxAmount) * maxBarHeight
                      : 0,
                  backgroundColor: day.isActive ? "#4285F4" : "#E0E0E0",
                },
              ]}
            />
            <StyledText variant="labelSmall" style={styles.dayLabel}>
              {day.date}
            </StyledText>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const WeeklyHistoryModal = ({
  isVisible,
  onClose,
  weeks,
  onWeekSelect,
  selectedWeekIndex,
}: WeeklyHistoryModalProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <StyledText variant="titleLarge">×</StyledText>
          </Pressable>
          <StyledText variant="headlineMedium" style={styles.title}>
            Select week
          </StyledText>
        </View>

        <View style={styles.weekDaysHeader}>
          <StyledText variant="bodyMedium" style={styles.weeklyEarningsText}>
            Weekly earnings
          </StyledText>
          <View style={styles.daysLabels}>
            <StyledText variant="bodySmall">M</StyledText>
            <StyledText variant="bodySmall">T</StyledText>
            <StyledText variant="bodySmall">W</StyledText>
            <StyledText variant="bodySmall">T</StyledText>
            <StyledText variant="bodySmall">F</StyledText>
            <StyledText variant="bodySmall">S</StyledText>
            <StyledText variant="bodySmall">S</StyledText>
          </View>
        </View>

        <ScrollView style={styles.weeksList}>
          {weeks.map((week, index) => (
            <View key={index}>
              <WeeklyHistoryRow
                week={week}
                onPress={() => onWeekSelect(week)}
                isSelected={index === selectedWeekIndex}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  closeButton: {
    padding: 8,
    position: "absolute",
    left: 16,
    top: 12,
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  weekDaysHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  weeklyEarningsText: {
    marginBottom: 8,
  },
  daysLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24, // Align with bars
  },
  weeksList: {
    flex: 1,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  selectedRow: {
    backgroundColor: "rgb(207, 223, 239)",
  },
  weekRange: {
    marginBottom: 4,
    color: "#000",
  },
  amount: {
    fontSize: 20,
    fontWeight: "500",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 170,
    alignItems: "flex-end",
    marginTop: 16,
    paddingHorizontal: 24,
    marginBottom: 70,
  },
  barWrapper: {
    alignItems: "center",
    width: 30, // Wider wrapper for better spacing
  },
  bar: {
    width: 15,
    borderRadius: 2,
  },
  dayLabel: {
    marginTop: 8,
    color: "#666",
  },
});

export default WeeklyHistoryModal;
