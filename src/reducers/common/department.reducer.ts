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
  name: 'common/department',
  initialState: initialState,
  reducers: {
    fetchDepartmentRequest: (state, action) => {
      return { ...state, loading: true, flag: null, message: "" };
    },
    fetchDepartmentSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: true,
        data: (payload.data || [])
      };
    },
    fetchDepartmentFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: (payload.message || "")
      };
    },
    fetchDepartmentReset: (state) => {
      return initialState;
    }
  }
});

// Actions
export const {
  fetchDepartmentRequest, fetchDepartmentSuccess, fetchDepartmentFailed, fetchDepartmentReset,
} = slice.actions;

// Reducers
export default slice.reducer;
