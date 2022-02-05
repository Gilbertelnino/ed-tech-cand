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
  name: "industry",
  initialState: initialState,
  reducers: {
    industryListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    industryListSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        data: _.get(payload, 'data', [])
      };
    },
    industryListFailed: (state, { payload }) => {
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

export const { industryListRequest, industryListSuccess, industryListFailed, industryReset } = slice.actions;

export default slice.reducer;
