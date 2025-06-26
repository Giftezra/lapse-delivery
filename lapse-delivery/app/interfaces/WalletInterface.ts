export interface WeeklyTransactionInterface {
  initiated_date: string;
  amount: number;
  currency: string;
}
export default interface WalletPaymentDetailsInterface {
  currency: string;
  paid_amount: number;
  payable_amount: number;
  transfer_fee: number;
  transfer_fee_tax: number;
  status: string;
  date: string;
  time: string;
}