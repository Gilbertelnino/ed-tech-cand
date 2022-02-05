import { createSlice } from '@reduxjs/toolkit'
import { get } from "lodash";
const _ = { get };



interface iInitialState {
  loading: boolean;
  companyFeedbackTypes: Array<{}>;
  candidateFeedbackTypes: Array<{}>;
  submitLoading: boolean;
  submitFlag: any;
  errors: object
  message: string;
  fileName: string;
}

// Initial state for reducer
const initialState: iInitialState = {
  loading: false,
  submitLoading: false,
  companyFeedbackTypes: [],
  candidateFeedbackTypes: [],
  submitFlag: null,
  errors: {},
  message: "",
  fileName: ""
};

const slice = createSlice({
  name: 'feedbackForm',
  initialState: initialState,
  reducers: {

    companyFeedbackTypeRequest: (state, { payload }) => {
      return { ...state, loading: true };
    },
    companyFeedbackTypeSuccess: (state, { payload }) => {
      return { ...state, loading: false, companyFeedbackTypes: _.get(payload, 'data', []) };
    },
    companyFeedbackTypeFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, 'message', ''), errors: _.get(payload, 'errors', {}) };
    },

    candidateFeedbackTypeRequest: (state) => {
      return { ...state, loading: true };
    },
    candidateFeedbackTypeSuccess: (state, { payload }) => {
      return { ...state, loading: false, candidateFeedbackTypes: _.get(payload, 'data', []) };
    },
    candidateFeedbackTypeFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, 'message', ''), errors: _.get(payload, 'errors', {}) };
    },

    submitFeedbackRequest: (state, { payload }) => {
      return { ...state, submitLoading: true, submitFlag: null, errors: {} };
    },
    submitFeedbackSuccess: (state, { payload }) => {
      return { ...state, submitLoading: false, submitFlag: true, errors: {} };
    },
    submitFeedbackFailed: (state, { payload }) => {
      return { ...state, submitLoading: false, submitFlag: false, errors: _.get(payload, 'errors', {}) };
    },
    resetSubmitFeedback: (state) => {
      return { ...state, submitFlag: null, errors: {} };
    }
  }
});

// Actions
export const {
  companyFeedbackTypeRequest, companyFeedbackTypeSuccess, companyFeedbackTypeFailed,
  candidateFeedbackTypeRequest, candidateFeedbackTypeSuccess, candidateFeedbackTypeFailed,
  submitFeedbackRequest, submitFeedbackSuccess, submitFeedbackFailed,
  resetSubmitFeedback
} = slice.actions;

// Reducers
export default slice.reducer;
