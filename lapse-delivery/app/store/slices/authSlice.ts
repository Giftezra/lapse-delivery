import AuthInterface, {
  UserInterface,
} from "@/app/interfaces/AuthenticationInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthInterface = {
  isAuthenticated: false,
  status: "offline",
  access: "",
  refresh: "",
  user: null,
  is_verified: false,
};

/* Create the slice to manage the users authentication state.
 * Each time the user logs in, the state will be updated with the user onject.
 * This populate the user data,
 * The users access, and refresh tokens.
 * The users online status, and delivering status.
 * The users authentication status.
 */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "offline";
      state.access = "";
    },

    /* Refresh token success - update tokens without affecting user data */
    refreshTokenSuccess: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setUser, logout, refreshTokenSuccess } = authSlice.actions;

export default authSlice.reducer;
