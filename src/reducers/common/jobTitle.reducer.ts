import { createSlice } from '@reduxjs/toolkit'

type initialStateInterface = {
  loading: boolean,
  flag: any, // null, true or false
  data: Array<object>,
  message: string
};

const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  data: [],
  message: "",
};

const slice = createSlice({
  name: 'common/job-title',
  initialState: initialState,
  reducers: {
    fetchJobTitleRequest: (state, action) => {
      return { ...state, loading: true, flag: null, message: "" };
    },
    fetchJobTitleSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: true,
        data: (payload.data || [])
      };
    },
    fetchJobTitleFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: (payload.message || "")
      };
    },
    fetchJobTitleReset: (state) => {
      return initialState;
    }
  }
});

// Actions
export const {
  fetchJobTitleRequest, fetchJobTitleSuccess, fetchJobTitleFailed, fetchJobTitleReset,
} = slice.actions;

// Reducers
export default slice.reducer;
