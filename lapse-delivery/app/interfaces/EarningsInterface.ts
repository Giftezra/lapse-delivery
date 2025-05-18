/**
 * Defines the interface for the barchat what displays a chart analysis for the week in review
 */
export interface EarningChartData {
  label: string;
  value: number;
}

export interface OnlineDurationAndTripsData  {
  duration: string;
  trips: number;
  points?: number;
}

export default interface EarningInterface {}
