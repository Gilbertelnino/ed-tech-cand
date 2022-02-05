import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

const initialState = {
  loading: false,
  flag: false,
  message: ""
};

const slice = createSlice({
  name: "company/candidates",
  initialState: initialState,
  reducers: {

    companyCandidatesRequest: (state, action) => {
      return { ...state, loading: true };
    },
    companyCandidatesSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true };
    },
    companyCandidatesFail: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {})
      };
    }

  }
});

export const {
  companyCandidatesRequest, companyCandidatesSuccess, companyCandidatesFail
} = slice.actions;

export default slice.reducer;
