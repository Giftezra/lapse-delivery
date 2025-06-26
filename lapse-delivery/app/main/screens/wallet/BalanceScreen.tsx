import { StyleSheet, View, SectionList, Animated } from "react-native";
import React, { useRef } from "react";
import BalanceHandlerComponent from "@/app/components/balance/BalanceHandlerComponent";
import BalanceItemsComponent from "@/app/components/balance/BalanceItemsComponent";
import { router } from "expo-router";
import { BalanceDataItem } from "@/app/interfaces/BalanceInterface";
import StyledText from "@/app/components/helpers/others/StyledText";

const balanceData: BalanceDataItem[] = [
  {
    id: "1",
    type: "tips",
    amount: 100,
    time: "2024-03-15T14:30:00",
    currency: "$",
  },
  {
    id: "2",
    type: "delivery",
    amount: 100,
    time: "2024-03-15T16:45:00",
    currency: "$",
  },
  {
    id: "3",
    type: "withdraw",
    amount: 100,
    time: "2024-03-14T09:15:00",
    currency: "$",
  },
  {
    id: "4",
    type: "promotions",
    amount: 100,
    time: "2024-03-14T11:30:00",
    currency: "$",
  },
  {
    id: "5",
    type: "referral",
    amount: 100,
    time: "2024-03-13T13:20:00",
    currency: "$",
  },
  {
    id: "6",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
  {
    id: "7",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
  {
    id: "8",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
  {
    id: "9",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
  {
    id: "10",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
  {
    id: "11",
    type: "other",
    amount: 100,
    time: "2024-03-13T17:45:00",
    currency: "$",
  },
];

const BalanceScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 200; // This should match the height in BalanceHandlerComponent

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Group transactions by date and format for SectionList
  const getSections = () => {
    const groups = balanceData.reduce<{ [key: string]: BalanceDataItem[] }>(
      (acc, item) => {
        const date = new Date(item.time);
        const dateKey = date.toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push({
          ...item,
          // Format time to show only hours and minutes
          time: new Date(item.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        return acc;
      },
      {}
    );

    // Convert to sections array and sort by date
    return Object.entries(groups)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString([], {
          month: "long",
          day: "2-digit",
        }),
        data: data.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        ),
      }))
      .sort(
        (a, b) =>
          new Date(b.data[0].time).getTime() -
          new Date(a.data[0].time).getTime()
      );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [1, headerHeight],
                  outputRange: [0, -headerHeight],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <BalanceHandlerComponent
          balance={100}
          currency="$"
          canGoBack={router.canGoBack()}
          isScrolled={
            scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1],
              extrapolate: 'extend',
            }) as any
          }
        />
      </Animated.View>
      <SectionList
        contentContainerStyle={{ paddingTop: headerHeight }}
        sections={getSections()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BalanceItemsComponent item={item} />}
        renderSectionHeader={({ section: { date } }) => (
          <View style={styles.sectionHeader}>
            <StyledText variant="labelMedium">{date}</StyledText>
          </View>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  sectionHeader: {
    marginVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: "#e0e0e0",
  },
});
