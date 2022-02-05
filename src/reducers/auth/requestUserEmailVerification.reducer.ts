import { createSlice } from '@reduxjs/toolkit';


type Inputs = {
  loading: boolean,
  flag: any, // null, true or false
  token: any,
  message: string
};

// Initial state for reducer
const initialState: Inputs = {
  loading: false,
  flag: null,
  token: null,
  message: ""
};

const slice = createSlice({
  name: 'auth/requestUserEmailVerification',
  initialState: initialState,
  reducers: {
    requestVerifyUserEmailRequest: (state, action) => {
      return { ...state, loading: true, flag: null };
    },
    requestVerifyUserEmailSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, message: (payload.message || "") };
    },
    requestVerifyUserEmailFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, message: (payload.message || "") };
    },
    resetRequestVerifyUserEmail: () => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  requestVerifyUserEmailRequest, requestVerifyUserEmailSuccess, requestVerifyUserEmailFailed, resetRequestVerifyUserEmail
} = slice.actions;

// Reducers
export default slice.reducer;
