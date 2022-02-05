import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

type initialStateInterface = {
  loading: boolean,
  profileGetFailed: boolean,
  errors: object,
  message: string,
  data: object
};

const initialState: initialStateInterface = {
  data: {},
  errors: {},
  message: "",
  loading: false,
  profileGetFailed: false
};

const slice = createSlice({
  name: "company/public/profile",
  initialState: initialState,
  reducers: {

    getCompanyProfileDetailRequest: (state, payload) => {
      return { ...state, loading: true, errors: {} };
    },
    getCompanyProfileDetailSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        errors: {},
        data: _.get(payload, 'data', {}),
        message: _.get(payload, "message", "")
      };
    },
    getCompanyProfileDetailFail: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        profileGetFailed: true,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {})
      };
    },
    resetCompanyProfileRequest: () => {
      return initialState;
    }
  }
});

export const { getCompanyProfileDetailRequest, getCompanyProfileDetailSuccess, getCompanyProfileDetailFail, resetCompanyProfileRequest } = slice.actions;

export default slice.reducer;