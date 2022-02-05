import { createSlice } from '@reduxjs/toolkit';


type initialStateInterface = {
  loading: boolean,
  flag: any, // null, true or false
  token: any,
  data: object,
  successMessage: string
  errorMessage: string
};

// Initial state for reducer
const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  token: null,
  data: {},
  successMessage: "",
  errorMessage: ""
};

const slice = createSlice({
  name: 'auth/verifyUser',
  initialState: initialState,
  reducers: {
    verifyUserEmailRequest: (state, action) => {
      return { ...initialState, loading: true };
    },
    verifyUserEmailSuccess: (state, { payload }) => {
      return { ...state, loading: false, data: payload.data, flag: true, successMessage: (payload.message || "") };
    },
    verifyUserEmailFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, errorMessage: (payload.message || "") };
    },
    resetVerifyUserEmail: () => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  verifyUserEmailRequest, verifyUserEmailSuccess, verifyUserEmailFailed, resetVerifyUserEmail
} = slice.actions;

// Reducers
export default slice.reducer;
