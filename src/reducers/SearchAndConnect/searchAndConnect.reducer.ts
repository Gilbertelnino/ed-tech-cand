import { createSlice } from '@reduxjs/toolkit';
import { get, set } from "lodash";
const _ = { get, set };
// Initial state for reducer
const initialState = {
  loading: false,
  pagination: {},
  data: [],
  message: ""
};

const slice = createSlice({
  name: 'searchAndConnect',
  initialState: initialState,
  reducers: {

    searchListRequest: (state, action) => {
      return { ...state, searchModalLoader: true };
    },
    searchListSuccess: (state, { payload }) => {
      return {
        ...state, 
        searchModalLoader: false,
        data: _.get(payload, "data.data", []),
        searchTerm: _.get(payload, "searchTerm", ""),
        allResult: _.get(payload, "allResult", false),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    searchListFailed: (state, { payload }) => {
      return { ...state, searchModalLoader: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    searchAllRequest: (state, action) => {
      return { ...state, loading: true };
    },
    searchAllSuccess: (state, { payload }) => {
      return {
        ...state, loading: false, searchData: _.get(payload, "data.data", []),
        searchTerm: _.get(payload, "searchTerm", ""),
        searchType: _.get(payload, "searchType", ""),
        allResult: _.get(payload, "allResult", false),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    searchAllFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    sendInvitationRequest: (state, action) => {
      return { ...state };
    },
    sendInvitationSuccess: (state, { payload }) => {
      return {
        ...state,
        inviteflag: true,
        message: _.get(payload, 'message', '')
      };
    },
    sendInvitationFailed: (state, { payload }) => {
      return { ...state, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    getCandidateProfileRequest: (state, action) => {
      return { ...state, profileLoading: true };
    },
    getCandidateProfileSuccess: (state, { payload }) => {
      return {
        ...state, 
        profileLoading: false, 
        profile: _.get(payload, "data.data", []),
      };
    },
    getCandidateProfileFailed: (state, { payload }) => {
      return { ...state, profileLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    candidateProfileReset: (state, { payload }) => {
      return { ...state,  profile: _.set(payload, "data.data", [])}
    },

    connectionRequestsListRequest: (state, action) => {
      return { ...state, loading: true };
    },
    connectionRequestsListSuccess: (state, { payload }) => {
      return {
        ...state, loading: false, connectionsData: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    connectionRequestsListFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    followCompanyRequest: (state, action) => {
      return { ...state };
    },
    followCompanySuccess: (state, { payload }) => {
      return {
        ...state,
        message: _.get(payload, 'message', '')
      };
    },
    followCompanyFailed: (state, { payload }) => {
      return { ...state, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    updateCandidateConnectionRequest: (state, action) => {
      return { ...state };
    },
    updateCandidateConnectionSuccess: (state, { payload }) => {
      return {
        ...state,
        message: _.get(payload, 'message', '')
      };
    },
    updateCandidateConnectionFailed: (state, { payload }) => {
      return { ...state, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },
  }
});

// Actions
export const {
  searchListRequest, searchListSuccess, searchListFailed,
  searchAllRequest, searchAllSuccess, searchAllFailed,
  sendInvitationRequest, sendInvitationSuccess, sendInvitationFailed,
  getCandidateProfileRequest, getCandidateProfileSuccess, getCandidateProfileFailed, candidateProfileReset,
  connectionRequestsListRequest, connectionRequestsListSuccess, connectionRequestsListFailed,
  followCompanyRequest, followCompanySuccess, followCompanyFailed,
  updateCandidateConnectionRequest, updateCandidateConnectionSuccess, updateCandidateConnectionFailed,
} = slice.actions;

// Reducers
export default slice.reducer;
