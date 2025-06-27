import OnboardingState from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./rtkBaseQuery";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    
    onboardRider: builder.mutation<OnboardingState, OnboardingState>({
      query: (credentials) => ({
        url: "/onboarding",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useOnboardRiderMutation } = onboardingApi;
