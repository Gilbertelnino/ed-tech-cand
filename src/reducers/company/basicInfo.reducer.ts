import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

type initialStateInterface = {
  loading: boolean,
  flag: any, // null, true or false
  errors: object,
  message: string,
  verifyLoading: boolean,
  pwdLoading: boolean,
  basicDetail: object,
  isVerified: boolean | null,
  pwdUpdated: boolean
};

const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  errors: {},
  message: "",
  verifyLoading: false,
  pwdLoading: false,
  basicDetail: {},
  isVerified: null,
  pwdUpdated: false
};

const slice = createSlice({
  name: "company/basic-info",
  initialState: initialState,
  reducers: {

    updateCompanyBasicInfoRequest: (state, action) => {
      return { ...state, loading: true, flag: null, errors: {} };
    },
    updateCompanyBasicInfoSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: true,
        errors: {},
        message: _.get(payload, "message", "")
      };
    },
    updateCompanyBasicInfoFail: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {})
      };
    },
    verifyTokenRequest: (state, action) => {
      return { ...state, verifyLoading: true };
    },
    verifyTokenSuccess: (state, { payload }) => {
      return {
        ...state,
        verifyLoading: false,
        isVerified: true,
        message: _.get(payload, "message", ""),
        basicDetail: _.get(payload, "data", {}),
      };
    },
    verifyTokenFail: (state, { payload }) => {
      return {
        ...state,
        verifyLoading: false,
        isVerified: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {})
      };
    },
    passwordUpdateRequest: (state, action) => {
      return { ...state, pwdLoading: true };
    },
    passwordUpdateSuccess: (state, { payload }) => {
      return {
        ...state,
        pwdLoading: false,
        pwdUpdated: true,
        message: _.get(payload, "message", ""),
      };
    },
    passwordUpdateFail: (state, { payload }) => {
      return {
        ...state,
        pwdLoading: false,
        pwdUpdated: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {})
      };
    },
    resetCompanyBasicInfoRequest: () => {
      return initialState;
    },
  }
});

export const {
  updateCompanyBasicInfoRequest, updateCompanyBasicInfoSuccess, updateCompanyBasicInfoFail, resetCompanyBasicInfoRequest,
  verifyTokenRequest, verifyTokenSuccess, verifyTokenFail,
  passwordUpdateRequest, passwordUpdateSuccess, passwordUpdateFail
} = slice.actions;

export default slice.reducer;
