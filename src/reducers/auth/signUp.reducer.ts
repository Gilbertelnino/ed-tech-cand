import { createSlice } from '@reduxjs/toolkit'

// Initial state for reducer
const initialState = {};

const slice = createSlice({
  name: 'auth/user-signUp',
  initialState: initialState,
  reducers: {
    setSignUpActiveForm: (state, { payload }) => {
      return { ...state, signUpActiveForm: payload };
    },
    userSignUpRequest: (state, action) => {
      return { ...state, loading: true };
    },
    userSignUpSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, message: payload.message, token: payload.token };
    },
    userSignUpFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: (payload.message || ""),
        errors: (payload.errors || {})
      };
    },
    userSignUpReset: (state) => {
      return {};
    }
  }
});

// Actions
export const {
  userSignUpRequest, userSignUpSuccess, userSignUpFailed, userSignUpReset, setSignUpActiveForm
} = slice.actions;

// Reducers
export default slice.reducer;
