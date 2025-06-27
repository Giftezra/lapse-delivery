import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./rtkBaseQuery";
import AuthInterface from "@/app/interfaces/AuthenticationInterface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({

    login: builder.mutation<AuthInterface, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

  }),
});

export const { useLoginMutation } = authApi;