export interface BalanceDataItem {
  id: string;
  time: string;
  amount: number;
  currency: string;
  type: string;
}

export default interface BalanceInterface {
  balance: number;
  currency: string;
  date: string;
}
