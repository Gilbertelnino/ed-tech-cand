import { createSlice } from '@reduxjs/toolkit';


type initialStateInterface = {
  loading: boolean,
  flag: any, // null, true or false
  successMessage: string
  errorMessage: string
};

// Initial state for reducer
const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  successMessage: "",
  errorMessage: ""
};

const slice = createSlice({
  name: 'auth/forgotPassword',
  initialState: initialState,
  reducers: {
    forgotPasswordRequest: (state, action) => {
      return { ...state, loading: true, flag: null };
    },
    forgotPasswordSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, successMessage: (payload.message || "") };
    },
    forgotPasswordFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, errorMessage: (payload.message || "") };
    },
    resetForgotPasswordMessages: (state) => {
      return { ...state, successMessage: "", errorMessage: "" }
    },
    resetForgotPassword: () => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed, resetForgotPassword, resetForgotPasswordMessages
} = slice.actions;

// Reducers
export default slice.reducer;
