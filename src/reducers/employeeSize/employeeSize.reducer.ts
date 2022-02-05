import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

type initialStateInterface = {
  loading: boolean,
  flag: any,
  errors: object,
  message: string
};

const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  errors: {},
  message: "",
};

const slice = createSlice({
  name: "employeeSize",
  initialState: initialState,
  reducers: {
    employeeSizeListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    employeeSizeListSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        data: _.get(payload, 'data', [])
      };
    },
    employeeSizeListFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: _.get(payload, 'message', ''),
        errors: _.get(payload, 'errors', {})
      };
    },
    industryReset: (state) => {
      return { ...initialState };
    },
  }
});

export const { employeeSizeListRequest, employeeSizeListSuccess, employeeSizeListFailed, industryReset } = slice.actions;

export default slice.reducer;
