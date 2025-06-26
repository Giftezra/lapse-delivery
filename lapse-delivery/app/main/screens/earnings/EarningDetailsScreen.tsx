import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/app/components/helpers/others/StyledText";
import EarningChartcomponent from "@/app/components/earninngs/EarningChartcomponent";
import {
  EarningsBreakdown,
  EarningsStats,
  WeeklyEarning,
  DailyEarning,
  WeeklyHistoryItem,
} from "@/app/interfaces/EarningsInterface";
import EarningDetailsChart from "@/app/components/earninngs/EarningDetailsChart";
import StyledButton from "@/app/components/helpers/buttons/StyledButton";
import WeeklyHistoryModal from "@/app/components/earninngs/WeeklyHistoryModal";

// Array of dummy data for multiple weeks
const dummyWeeksData = [
  {
    weeklyEarning: {
      startDate: "Jun 2",
      endDate: "Jun 8",
      totalAmount: 285.32,
      dailyEarnings: [
        { date: "2024-06-02", amount: 45.5, isActive: true },
        { date: "2024-06-03", amount: 38.8, isActive: true },
        { date: "2024-06-04", amount: 42.2, isActive: true },
        { date: "2024-06-05", amount: 48.3, isActive: true },
        { date: "2024-06-06", amount: 39.9, isActive: true },
        { date: "2024-06-07", amount: 37.74, isActive: true },
        { date: "2024-06-08", amount: 32.88, isActive: true },
      ],
    } as WeeklyEarning,
    stats: {
      onlineTime: "32h 45m",
      trips: 38,
      points: "---",
    } as EarningsStats,
    breakdown: {
      netFare: 259.67,
      promotions: 12.0,
      tips: 13.65,
      totalEarnings: 285.32,
    } as EarningsBreakdown,
  },
  {
    weeklyEarning: {
      startDate: "Jun 9",
      endDate: "Jun 15",
      totalAmount: 247.44,
      dailyEarnings: [
        { date: "2024-06-09", amount: 35.5, isActive: true },
        { date: "2024-06-10", amount: 32.8, isActive: true },
        { date: "2024-06-11", amount: 45.2, isActive: true },
        { date: "2024-06-12", amount: 55.3, isActive: true },
        { date: "2024-06-13", amount: 42.9, isActive: true },
        { date: "2024-06-14", amount: 35.74, isActive: true },
        { date: "2024-06-15", amount: 33.0, isActive: true },
      ],
    } as WeeklyEarning,
    stats: {
      onlineTime: "36h 1m",
      trips: 42,
      points: "---",
    } as EarningsStats,
    breakdown: {
      netFare: 229.67,
      promotions: 5.0,
      tips: 12.77,
      totalEarnings: 247.44,
    } as EarningsBreakdown,
  },
  {
    weeklyEarning: {
      startDate: "Jun 16",
      endDate: "Jun 22",
      totalAmount: 312.55,
      dailyEarnings: [
        { date: "2024-06-16", amount: 48.5, isActive: true },
        { date: "2024-06-17", amount: 42.8, isActive: true },
        { date: "2024-06-18", amount: 47.2, isActive: true },
        { date: "2024-06-19", amount: 52.3, isActive: true },
        { date: "2024-06-20", amount: 45.9, isActive: true },
        { date: "2024-06-21", amount: 40.74, isActive: true },
        { date: "2024-06-22", amount: 35.11, isActive: true },
      ],
    } as WeeklyEarning,
    stats: {
      onlineTime: "39h 15m",
      trips: 45,
      points: "---",
    } as EarningsStats,
    breakdown: {
      netFare: 289.67,
      promotions: 8.0,
      tips: 14.88,
      totalEarnings: 312.55,
    } as EarningsBreakdown,
  },
];

const EarningDetailsScreen = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const barContainerWidth = useRef(0);
  const [showData, setShowData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // Start with middle week
  const currentWeekData = dummyWeeksData[currentWeekIndex];

  // Transform the dummyWeeksData into the format needed for the history modal
  const historyWeeks: WeeklyHistoryItem[] = dummyWeeksData.map((weekData) => ({
    weekRange: `${weekData.weeklyEarning.startDate} - ${weekData.weeklyEarning.endDate}`,
    amount: weekData.weeklyEarning.totalAmount,
    days: weekData.weeklyEarning.dailyEarnings.map((day) => ({
      date: parseInt(day.date.split("-")[2]), // Extract day from date
      amount: day.amount,
      isActive: day.isActive || false,
    })),
  }));

  const handleWeekSelect = (selectedWeek: WeeklyHistoryItem) => {
    const index = historyWeeks.findIndex(
      (week) => week.weekRange === selectedWeek.weekRange
    );
    if (index !== -1) {
      setCurrentWeekIndex(index);
      setIsModalOpen(false);
    }
  };

  /* Helper function to create a new week based on a date */
  const createWeekData = (baseDate: string): (typeof dummyWeeksData)[0] => {
    const date = new Date(baseDate);
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 7);
    const endDate = new Date(date);

    // Generate daily earnings for the new week
    const dailyEarnings: DailyEarning[] = [];
    let totalAmount = 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const amount = Math.random() * 50 + 20; // Random amount between 20 and 70
      totalAmount += amount;

      dailyEarnings.push({
        date: currentDate.toISOString().split("T")[0],
        amount,
        isActive: true,
      });
    }

    // Create random but realistic stats and breakdown
    const trips = Math.floor(Math.random() * 20) + 30; // 30-50 trips
    const onlineHours = Math.floor(Math.random() * 10) + 30; // 30-40 hours
    const onlineMinutes = Math.floor(Math.random() * 60);

    return {
      weeklyEarning: {
        startDate: startDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        endDate: endDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        totalAmount,
        dailyEarnings,
      },
      stats: {
        onlineTime: `${onlineHours}h ${onlineMinutes}m`,
        trips,
        points: "---",
      },
      breakdown: {
        netFare: totalAmount * 0.85, // 85% of total as net fare
        promotions: totalAmount * 0.05, // 5% as promotions
        tips: totalAmount * 0.1, // 10% as tips
        totalEarnings: totalAmount,
      },
    };
  };

  /* Handle how the active week is set when the user clicks on the toggle button */
  const handleWeekToggle = (direction: "prev" | "next") => {
    let newIndex =
      direction === "prev" ? currentWeekIndex - 1 : currentWeekIndex + 1;

    // If we're at the edges of our dummy data, generate new data
    if (newIndex < 0 || newIndex >= dummyWeeksData.length) {
      const baseDate = new Date(
        currentWeekData.weeklyEarning.dailyEarnings[0].date
      );
      if (direction === "prev") {
        baseDate.setDate(baseDate.getDate() - 7);
      } else {
        baseDate.setDate(baseDate.getDate() + 14); // Skip current week
      }
      const newWeekData = createWeekData(baseDate.toISOString());

      if (direction === "prev") {
        dummyWeeksData.unshift(newWeekData);
        newIndex = 0;
      } else {
        dummyWeeksData.push(newWeekData);
        newIndex = dummyWeeksData.length - 1;
      }
    }

    setCurrentWeekIndex(newIndex);
  };

  // For testing empty state, you can set showData to false
  if (!showData) {
    return (
      <View style={styles.emptyContainer}>
        <StyledText variant="titleLarge">No earnings data available</StyledText>
        <StyledText variant="bodyMedium">
          Start delivering to see your earnings here
        </StyledText>
      </View>
    );
  }

  // Transform daily earnings data for chart
  const chartData = currentWeekData.weeklyEarning.dailyEarnings.map(
    (earning) => ({
      value: earning.amount,
      label: new Date(earning.date).toLocaleDateString("en-US", {
        weekday: "short",
      })[0],
    })
  );

  return (
    <View style={styles.mainContainer}>
      {/* Display the current week and the previous and next week */}
      <Pressable
        style={styles.weekSelector}
        onPress={() => setIsModalOpen(true)}
      >
        <StyledText
          children={`${currentWeekData.weeklyEarning.startDate} - ${currentWeekData.weeklyEarning.endDate}`}
          variant="titleMedium"
          style={{ fontWeight: "700" }}
        />
        <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
      </Pressable>

      {/* Weekly History Modal */}
      <WeeklyHistoryModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weeks={historyWeeks}
        onWeekSelect={handleWeekSelect}
        selectedWeekIndex={currentWeekIndex}
      />

      <ScrollView
        style={styles.scrollView}
        onScroll={({ nativeEvent }) => {
          setIsScrolled(nativeEvent.contentOffset.y > 0);
        }}
      >
        {/* Earnings Overview */}
        <View style={styles.earningsOverviewContainer}>
          <Pressable onPress={() => handleWeekToggle("prev")}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
          </Pressable>
          <View style={styles.earningsOverview}>
            <StyledText variant="headlineLarge" style={styles.amount}>
              €{currentWeekData.weeklyEarning.totalAmount.toFixed(2)}
            </StyledText>
            <StyledText variant="bodyMedium" style={styles.dateRange}>
              {`${currentWeekData.weeklyEarning.startDate} - ${currentWeekData.weeklyEarning.endDate}`}
            </StyledText>
          </View>
          <Pressable onPress={() => handleWeekToggle("next")}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="black"
            />
          </Pressable>
        </View>

        {/* Chart */}
        <EarningDetailsChart data={chartData} />

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <StyledText variant="bodyMedium">Online</StyledText>
            <StyledText variant="titleMedium">
              {currentWeekData.stats.onlineTime}
            </StyledText>
          </View>
          <View style={styles.statItem}>
            <StyledText variant="bodyMedium">Trips</StyledText>
            <StyledText variant="titleMedium">
              {currentWeekData.stats.trips}
            </StyledText>
          </View>
          <View style={styles.statItem}>
            <StyledText variant="bodyMedium">Points</StyledText>
            <StyledText variant="titleMedium">
              {currentWeekData.stats.points}
            </StyledText>
          </View>
        </View>

        {/* Breakdown */}
        <View style={styles.breakdownContainer}>
          <StyledText variant="titleLarge" style={styles.breakdownTitle}>
            Breakdown
          </StyledText>
          <View style={styles.breakdownItem}>
            <StyledText variant="bodyLarge">Net Fare</StyledText>
            <StyledText variant="bodyLarge">
              €{currentWeekData.breakdown.netFare.toFixed(2)}
            </StyledText>
          </View>
          <View style={styles.breakdownItem}>
            <StyledText variant="bodyLarge">Promotions</StyledText>
            <StyledText variant="bodyLarge">
              €{currentWeekData.breakdown.promotions.toFixed(2)}
            </StyledText>
          </View>
          <View style={styles.breakdownItem}>
            <StyledText variant="bodyLarge">Tips</StyledText>
            <StyledText variant="bodyLarge">
              €{currentWeekData.breakdown.tips.toFixed(2)}
            </StyledText>
          </View>
          <View style={[styles.breakdownItem, styles.totalItem]}>
            <StyledText variant="titleLarge">Total Earnings</StyledText>
            <StyledText variant="titleLarge">
              €{currentWeekData.breakdown.totalEarnings.toFixed(2)}
            </StyledText>
          </View>
        </View>

        {/* Display the earning details button which will navigate to the calendar screen */}
        <StyledButton
          title="View Details"
          onPress={() => {
            router.push("/main/screens/earnings/EarningDetailsCalendarScreen");
          }}
          variant="secondary"
        />
      </ScrollView>
    </View>
  );
};

export default EarningDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  helpButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  helpText: {
    color: "#fff",
  },
  weekSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 20,
  },
  earningsOverviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  earningsOverview: {
    alignItems: "center",
    paddingVertical: 24,
  },
  amount: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 8,
  },
  dateRange: {
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  statItem: {
    alignItems: "center",
  },
  breakdownContainer: {
    padding: 16,
  },
  breakdownTitle: {
    marginBottom: 24,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  totalItem: {
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    marginTop: 12,
    paddingTop: 24,
  },
});
