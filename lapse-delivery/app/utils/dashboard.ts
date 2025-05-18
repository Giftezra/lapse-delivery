import { Dimensions, ScrollView } from "react-native";

interface ScrollHandlers {
  handleScroll: (event: any, setActiveIndex: (index: number) => void) => void;
  handleDotPress: (
    index: number,
    scrollViewRef: React.RefObject<ScrollView | null>,
    setActiveIndex: (index: number) => void
  ) => void;
}

const dashboardUtils: ScrollHandlers = {
  /**
   * Handle the scroll event to navigate to the index thats not in view.
   * Using the math.round, get the index of the dot thats not in view.
   * Set the active index to the new index.
   * @param event - The event object.
   * @param setActiveIndex - Function to update the active index
   */
  handleScroll: (event: any, setActiveIndex: (index: number) => void) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get("window").width;
    const newIndex = Math.round(contentOffset / screenWidth);
    setActiveIndex(newIndex);
  },

  /**
   * Handle the dot press event to scroll and navigate to the index thats not in view.
   * @param index - The index of the dot to navigate to.
   * @param scrollViewRef - Reference to the ScrollView
   * @param setActiveIndex - Function to update the active index
   */
  handleDotPress: (
    index: number,
    scrollViewRef: React.RefObject<ScrollView | null>,
    setActiveIndex: (index: number) => void
  ) => {
    const screenWidth = Dimensions.get("window").width;
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth * 0.95,
      animated: true,
    });
    setActiveIndex(index);
  },
};

export default dashboardUtils;
