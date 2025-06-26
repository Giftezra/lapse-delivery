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

export interface EarningsStats {
  onlineTime: string;
  trips: number;
  points: number | string;
}

export interface EarningsCalendarProps {
  selectedWeek: WeeklyEarning;
  onWeekChange: (week: WeeklyEarning) => void;
  stats: EarningsStats;
}
