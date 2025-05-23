/* Maininterface that would be implemented with the dashboard context provider */
export default interface DashboardPRoviderInterface {}
/* Interface defines the states of the users last delivery status.
 * This includes the last amount, day and time */
export interface LastDeliveryStatus {
  amount: number;
  currency?: string;
  day?: any;
  time?: string;
  description?: string;
}
/* Interface defines the new delivery alert that would be displayed on the dashboard when the user has a new delivery. */
export interface NewDeliveryAlert {
  id:string;
  amount:number;
  
}


