import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useOnboardRiderMutation } from "../store/apis/onboardingApi";
import { clearOnboarding } from "../store/slices/OnboardingSlice";
import { useAlertContext } from "../context/AlertContext";

export const useOnboarding = () => {
  const { personalInfo, bankInfo, vehicleInfo, identityInfo, completedSteps } =
    useAppSelector((state) => state.onboarding);
  const [onboardRider, { isLoading, isSuccess, isError, error }] =
    useOnboardRiderMutation();
  const dispatch = useAppDispatch();

  // Import the alert context to use the alert modal
  const { setAlertConfig, setIsVisible } = useAlertContext();

  /* Set new loading states to use while onboarding the user */
  const [isOnboarding, setIsOnboarding] = useState(false);

  /**
   * Handle the user onboarding flow to
   */
  const handleOnboarding = async () => {
    /* Set the credentials for the onboarding process to accept all the 
    fields from the personalInfo, bankInfo, vehicleInfo, and identityInfo.
    * Given the vehichletype, the vehichleinfo would be omitted or sent to the server*/
    let credentials = {};
    if (vehicleInfo?.vehicleType === "bicycle") {
        credentials = {
            personalInfo,
            bankInfo,
            identityInfo,
        }
    }else{
        credentials = {
            personalInfo,
            bankInfo,
            vehicleInfo,
            identityInfo,
        }
    }

    console.log("handleOnboarding", credentials);
    {
      setIsOnboarding(true);
      try {
        // Send the credentials to the server to onboard the user
        // If the response is successful, clear the credentials and set the completed steps to []
        const response = await onboardRider(credentials).unwrap();
        if (response.success) {
          dispatch(clearOnboarding());
        } else if (response.error || error) {
          setAlertConfig({
            title: "Error",
            message: response.error || error,
            type: "error",
            isVisible: true,
            onConfirm: () => {
              setIsVisible(false);
            },
          });
        }
      } catch (error) {
        console.error("Error onboarding user:", error);
      } finally {
        setIsOnboarding(false);
      }
    }
  };

  return {
    handleOnboarding,
    isOnboarding,
  };
};

export default useOnboarding;
