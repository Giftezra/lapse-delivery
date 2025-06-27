import { combineReducers } from "@reduxjs/toolkit";
import onboardingReducer from "./slices/OnboardingSlice";
import { onboardingApi } from "./apis/onboardingApi";
import authReducer from "./slices/authSlice";
import { authApi } from "./apis/authApi";

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})

export default rootReducer;