import { createSlice } from '@reduxjs/toolkit';
import { get } from "lodash";
const _ = { get };
// Initial state for reducer
const initialState = {
  loading: false,
  detailLoading: false,
  flag: false,
  updateflag: false,
  deleteflag: false,
  archiveflag: false,
  pagination: {},
  data: [],
  detail: {},
  jobTypes: [],
  jobLevels: [],
  jobStatuses: [],
  jobDepartments: {
    loading: false,
    errors: null,
    message: "",
    data: []
  },
  salaryRanges: [],
  jobFilter: {},
  message: ""
};

const slice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {

    jobListRequest: (state, action) => {
      return { ...state, loading: true, flag: false, updateflag: false, archiveflag: false };
    },
    publicJobListRequest: (state, action) => {
      return { ...state, loading: true };
    },
    jobListSuccess: (state, { payload }) => {
      return {
        ...state, loading: false, flag: false, data: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    jobListFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    getJobRequest: (state, payload) => {
      return { ...state, detailLoading: true };
    },
    getJobSuccess: (state, { payload }) => {
      return { ...state, detailLoading: false, flag: false, detail: payload.data };
    },
    getJobFailed: (state, { payload }) => {
      return { ...state, detailLoading: false, flag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    createJobRequest: (state, payload) => {
      return { ...state, loading: true }
    },
    createJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, message: payload.message };
    },
    createJobFailed: (state, { payload }) => {
      return { ...state, loading: false, flag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    deleteJobRequest: (state) => {
      return { ...state, deleteflag: false, loading: true }
    },
    deleteJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, deleteflag: true, message: payload.message };
    },
    deleteJobFailed: (state, { payload }) => {
      return { ...state, loading: false, deleteflag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    updateJobRequest: (state, payload) => {
      return { ...state, loading: true }
    },
    updateJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, updateflag: true, message: payload.message };
    },
    updateJobFailed: (state, { payload }) => {
      return { ...state, loading: false, updateflag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    archiveJobRequest: (state, payload) => {
      return { ...state, loading: true }
    },
    archiveJobSuccess: (state, { payload }) => {
      return { ...state, loading: false, archiveflag: true, message: payload.message };
    },
    archiveJobFailed: (state, { payload }) => {
      return { ...state, loading: false, archiveflag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    jobTypesRequest: (state) => {
      return { ...state, loading: true };
    },
    jobTypesSuccess: (state, { payload }) => {
      return { ...state, loading: false, jobTypes: _.get(payload, "data", []) };
    },
    jobTypesFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    jobLevelsRequest: (state) => {
      return { ...state, loading: true };
    },
    jobLevelsSuccess: (state, { payload }) => {
      return { ...state, loading: false, jobLevels: _.get(payload, "data", []) };
    },
    jobLevelsFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    salaryRangesRequest: (state) => {
      return { ...state, loading: true };
    },
    salaryRangesSuccess: (state, { payload }) => {
      return { ...state, loading: false, salaryRanges: _.get(payload, "data", []) };
    },
    salaryRangesFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    jobStatusRequest: (state) => {
      return { ...state, loading: true };
    },
    jobStatusSuccess: (state, { payload }) => {
      return { ...state, loading: false, jobStatuses: _.get(payload, "data", []) };
    },
    jobStatusFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    jobReset: (state) => {
      return { ...state, ...initialState };
    },

    jobDetailReset: (state) => {
      return { ...state, detail: {} };
    },

    jobAddFilter: (state, { payload }) => {
      return { ...state, jobFilter: { ...payload } };
    },

    jobResetFilter: (state) => {
      return { ...state, jobFilter: {} };
    },

    jobDepartmentListRequest: (state) => {
      return {
        ...state,
        jobDepartments:{
          ...state.jobDepartments,
          loading: true,
        }
      };
    },

    jobDepartmentListSuccess: (state, { payload }) => {
      return {
        ...state,
        jobDepartments:{
          ...state.jobDepartments,
          data: _.get(payload, "data", []),
          loading: false
        },
      };
    },

    jobDepartmentListFailed: (state, { payload }) => {
      return {
        ...state,
        jobDepartments:{
          ...state.jobDepartments,
          loading: false,
          message: _.get(payload, "message", ""),
          errors: _.get(payload, "errors", {}),
        }
      };
    },
  }
});

// Actions
export const {
  getJobRequest, getJobSuccess, getJobFailed,
  jobListRequest, jobListSuccess, jobListFailed,
  jobTypesRequest, jobTypesSuccess, jobTypesFailed,
  jobStatusRequest, jobStatusSuccess, jobStatusFailed,
  jobLevelsRequest, jobLevelsSuccess, jobLevelsFailed,
  createJobRequest, createJobSuccess, createJobFailed,
  deleteJobRequest, deleteJobSuccess, deleteJobFailed,
  updateJobRequest, updateJobSuccess, updateJobFailed,
  archiveJobRequest, archiveJobSuccess, archiveJobFailed,
  salaryRangesRequest, salaryRangesSuccess, salaryRangesFailed,
  jobDepartmentListRequest, jobDepartmentListSuccess, jobDepartmentListFailed,
  jobReset, jobDetailReset, jobAddFilter, jobResetFilter,
  publicJobListRequest
} = slice.actions;

// Reducers
export default slice.reducer;
