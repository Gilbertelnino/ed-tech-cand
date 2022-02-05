import { createSlice } from '@reduxjs/toolkit'

// Initial state for reducer
const initialState = {
  loading: false,
  flag: false,
  message: ""
};

const slice = createSlice({
  name: 'auth/login',
  initialState: initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      return { ...state, loading: true };
    },
    userLoginSuccess: (state, { payload }) => {
      return { ...state, ...payload, loading: false, flag: true };
    },
    userLoginFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: (payload.message || ""),
        errors: (payload.errors || {})
      };
    },
    resetLoginFlag: () => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  userLoginRequest, userLoginSuccess, userLoginFailed, resetLoginFlag
} = slice.actions;

// Reducers
export default slice.reducer;
