/**
 * Centralized earnings interfaces
 */

// Chart related interfaces
export interface EarningChartData {
  label: string;
  value: number;
}

// Stats related interfaces
export interface EarningStatsInterface {
  duration: string;
  trips: number;
  points?: number;
}

// Calendar related interfaces
export interface DailyEarning {
  date: string;
  amount: number;
  isActive?: boolean;
}

export interface WeeklyEarning {
  startDate: string;
  endDate: string;
  totalAmount: number;
  dailyEarnings: DailyEarning[];
}

// Weekly History Modal interfaces
export interface WeeklyHistoryItem {
  weekRange: string;
  amount: number;
  days: {
    date: number;
    amount: number;
    isActive: boolean;
  }[];
  isSelected?: boolean;
}

export interface WeeklyHistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  weeks: WeeklyHistoryItem[];
  onWeekSelect: (week: WeeklyHistoryItem) => void;
  selectedWeekIndex: number;
}

export interface WeeklyHistoryRowProps {
  week: WeeklyHistoryItem;
  onPress: () => void;
  isSelected: boolean;
}

export interface EarningsStats {
  onlineTime: string;
  trips: number;
  points: number | string;
}

// Breakdown related interfaces
export interface EarningsBreakdown {
  netFare: number;
  promotions: number;
  tips: number;
  totalEarnings: number;
}

// Props interfaces
export interface EarningsCalendarProps {
  selectedWeek: WeeklyEarning;
  onWeekChange: (week: WeeklyEarning) => void;
  stats: EarningsStats;
}

export interface EarningsDetailsProps {
  breakdown: EarningsBreakdown;
  stats: EarningsStats;
  weeklyEarning: WeeklyEarning;
}

export default interface EarningInterface extends EarningsDetailsProps {}
