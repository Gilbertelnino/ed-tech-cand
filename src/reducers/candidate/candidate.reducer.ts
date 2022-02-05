import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

// Initial state for reducer
const initialState = {
  loading: false,
  updateflag: false,
  applyflag: false,
  saveFlag: false,
  uploadLoading: false,
  deleteflag: false,
  isEditModeOn: false,
  detail: {},
  jobApplications: { loading: false, error: null, data: { applied: [], saved: [] }, appliedPagination: {}, savedPagination: {} },
  profileData: {},
  message: "",
  imageUrl: "",
};

const slice = createSlice({
  name: "candidate",
  initialState: initialState,
  reducers: {
    setEditModeOn: (state, { payload }) => {
      return { ...state, isEditModeOn: payload };
    },
    setJobDescriptionModalOpen: (state, { payload }) => {
      return { ...state, isJobDescriptionModalOpen: payload };
    },
    candidateReset: (state) => {
      return { ...state, ...initialState };
    },
    getCandidateProfileDetailRequest: (state, payload) => {
      return { ...state, loading: true, errors: {} };
    },
    getCandidateProfileDetailSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        errors: {},
        data: _.get(payload, "data", {}),
        message: _.get(payload, "message", ""),
      };
    },
    getCandidateProfileDetailFail: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {}),
      };
    },
    updateCandidateRequest: (state, payload) => {
      return { ...state, loading: true };
    },
    updateCandidateSuccess: (state, { payload }) => {
      return { ...state, loading: false, updateflag: true, message: payload.message };
    },
    updateCandidateFailed: (state, { payload }) => {
      return { ...state, loading: false, updateflag: false, message: payload.message || "", errors: payload.errors || {} };
    },
    getCandidateJobApplicationsRequest: (state, { payload }) => {
      return { ...state, jobApplications: { ...state.jobApplications, loading: true } };
    },
    getCandidateJobApplicationsAppliedSuccess: (state, { payload }) => {
      return {
        ...state,
        jobApplications: {
          ...state.jobApplications,
          data: { ...state.jobApplications.data, applied: _.get(payload, "data.data", []) },
          appliedPagination: _.get(payload, "data.pagination", {}),
        },
      };
    },
    getCandidateJobApplicationsSavedSuccess: (state, { payload }) => {
      return {
        ...state,
        jobApplications: {
          ...state.jobApplications,
          data: { ...state.jobApplications.data, saved: _.get(payload, "data.data", []) },
          savedPagination: _.get(payload, "data.pagination", {}),
        },
      };
    },
    getCandidateJobApplicationsFulfilled: (state) => {
      return { ...state, jobApplications: { ...state.jobApplications, loading: false } };
    },
    getCandidateJobApplicationsFailed: (state, { payload }) => {
      return { ...state, jobApplications: { ...state.jobApplications, loading: false, error: payload.message } };
    },
    applyJobRequest: (state, payload) => {
      return { ...state, applyflag: false, loading: true };
    },
    applyJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, applyflag: true, message: payload.message };
    },
    applyJobFailed: (state, { payload }) => {
      return { ...state, loading: false, applyflag: false, message: payload.message || "", errors: payload.errors || {} };
    },
    saveJobRequest: (state, payload) => {
      return { ...state, saveFlag: false, loading: true };
    },
    saveJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, saveFlag: true, message: payload.message };
    },
    saveJobFailed: (state, { payload }) => {
      return { ...state, loading: false, saveFlag: false, message: payload.message || "", errors: payload.errors || {} };
    },
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
        errors: _.get(payload, "errors", {}),
      };
    },
    uploadCandidateFileRequest: (state, payload) => {
      return { ...state, uploadLoading: true };
    },
    uploadCandidateFileSuccess: (state, { payload }) => {
      return { ...state, uploadLoading: false, imageUrl: _.get(payload, "data.url", ""), message: payload.message };
    },
    uploadCandidateFileFailed: (state, { payload }) => {
      return { ...state, uploadLoading: false, message: payload.message || "", errors: payload.errors || {} };
    },

    deleteVideoRequest: (state) => {
      return {
        ...state,
        deleteflag: false,
        loading: true,
      };
    },
    deleteVideoSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        deleteflag: true,
        message: _.get(payload, "message", ""),
      };
    },
    deleteVideoFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        deleteflag: false,
        message: _.get(payload, "message", ""),
        errors: _.get(payload, "errors", {}),
      };
    },
  },
});

// Actions
export const {
  applyJobRequest,
  applyJobSuccess,
  applyJobFailed,
  saveJobRequest,
  saveJobFailed,
  saveJobSuccess,
  deleteVideoRequest,
  deleteVideoSuccess,
  deleteVideoFailed,
  updateCandidateRequest,
  updateCandidateSuccess,
  updateCandidateFailed,
  companyCandidatesRequest,
  companyCandidatesSuccess,
  companyCandidatesFail,
  uploadCandidateFileRequest,
  uploadCandidateFileSuccess,
  uploadCandidateFileFailed,
  candidateReset,
  setEditModeOn,
  setJobDescriptionModalOpen,
  getCandidateProfileDetailRequest,
  getCandidateProfileDetailSuccess,
  getCandidateProfileDetailFail,
  getCandidateJobApplicationsRequest,
  getCandidateJobApplicationsAppliedSuccess,
  getCandidateJobApplicationsSavedSuccess,
  getCandidateJobApplicationsFailed,
  getCandidateJobApplicationsFulfilled,
} = slice.actions;

// Reducers
export default slice.reducer;
