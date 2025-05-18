import { GestureResponderEvent } from "react-native";

export interface DeliveryOptionsChoicesInterface {
  /* The interface is used to display and collect the delivery choices the user would want to deliver with on the app. */
  title: string;
  description?: string;
  age: number;
  license?: string;
  expierience?: string;
  vehicle: "Car" | "Bike" | "Motorcycle";
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default interface OnboardingContextInterface {
}
