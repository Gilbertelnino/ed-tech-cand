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
  name: 'auth/resetPassword',
  initialState: initialState,
  reducers: {
    resetPasswordRequest: (state, action) => {
      return { ...state, loading: true, flag: null };
    },
    resetPasswordSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, successMessage: (payload.message || "") };
    },
    resetPasswordFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, errorMessage: (payload.message || "") };
    },
    resetPasswordMessages: (state) => {
      return { ...state, successMessage: "", errorMessage: "" }
    },
    resetPasswordState: () => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed, resetPasswordState, resetPasswordMessages
} = slice.actions;

// Reducers
export default slice.reducer;
