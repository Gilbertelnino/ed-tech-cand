import { createSlice } from "@reduxjs/toolkit";
import history from "../../utils/history";
import appRoutes from "../../routes/app.routes";

const initialState = {
  token: null,
  currentUser: {}
};

const sessionReducer = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setSessionTokenRequest: (state, { payload }) => {
      return { ...state, token: payload };
    },
    fetchSessionDataRequest: (state) => {
      return { ...state };
    },
    setSessionUserRequest: (state, { payload }) => {
      return { ...state, currentUser: payload };
    },
    sessionOutRequest: (state) => {
      return { ...state };
    },
    sessionOut: (state) => {
      return { ...initialState };
    }
  }
});

// Export actions
export const {
  setSessionTokenRequest, fetchSessionDataRequest, setSessionUserRequest, sessionOutRequest, sessionOut
} = {
  ...sessionReducer.actions,
};

// Export reducers
export default sessionReducer.reducer;
