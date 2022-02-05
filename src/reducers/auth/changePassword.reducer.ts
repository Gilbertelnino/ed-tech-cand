import { createSlice } from '@reduxjs/toolkit'

// Initial state for reducer
const initialState = {};

const slice = createSlice({
  name: 'auth/change-password',
  initialState: initialState,
  reducers: {
    userChangePasswordRequest: (state, action) => {
      return { loading: true };
    },
    userChangePasswordSuccess: (state, { payload }) => {
      return { loading: false, changePasswordFlag: true, message: payload.message };
    },
    userChangePasswordFailed: (state, { payload }) => {
      return { loading: false, changePasswordFlag: false, message: payload.message };
    },
    userChangePasswordReset: (state, action) => {
      return {};
    }
  }
});

// Actions
export const {
  userChangePasswordRequest, userChangePasswordSuccess, userChangePasswordFailed,
  userChangePasswordReset,
} = slice.actions;

// Reducers
export default slice.reducer;
