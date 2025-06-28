import OnboardingState from "@/app/interfaces/onboarding/OnboardingInterfaces";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./rtkBaseQuery";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    
    onboardRider: builder.mutation({
      query: (credentials) => ({
        url: "api/v1/delivery/onboarding/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useOnboardRiderMutation } = onboardingApi;
export default onboardingApi;
