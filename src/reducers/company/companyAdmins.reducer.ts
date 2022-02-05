import { createSlice } from '@reduxjs/toolkit';
import { get } from "lodash";
const _ = { get };

// Initial state for reducer
const initialState = {
  loading: false,
  createflag: false,
  deleteflag: false,
  invitedflag: false,
  reInvitedFlag: false,
  searchLoading: false,
  detailLoading: false,
  inviteLoading: false,
  reInviteLoading: false,
  auditLogLoading: false,
  invitedByMailflag: false,
  inviteByMailLoading: false,
  pagination: {},
  data: [],
  list: [],
  history: [],
  detail: {},
  adminFilter: {},
  searchedCompanies: [],
  message: ""
};

const slice = createSlice({
  name: 'company/admins',
  initialState: initialState,
  reducers: {

    adminListRequest: (state, action) => {
      return { ...state, loading: true };
    },
    adminListSuccess: (state, { payload }) => {
      return {
        ...state, loading: false, data: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    adminListFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    adminAllListRequest: (state) => {
      return { ...state, loading: true };
    },
    adminAllListSuccess: (state, { payload }) => {
      return { ...state, loading: false, list: _.get(payload, "data.data", []) };
    },
    adminAllListFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    searchCompaniesRequest: (state, action) => {
      return { ...state, searchLoading: true };
    },
    searchCompaniesSuccess: (state, { payload }) => {
      return {
        ...state, searchLoading: false, searchedCompanies: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    searchCompaniesFailed: (state, { payload }) => {
      return { ...state, searchLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    getAdminRequest: (state, payload) => {
      return { ...state, detailLoading: true };
    },
    getAdminSuccess: (state, { payload }) => {
      return { ...state, detailLoading: false, detail: payload.data };
    },
    getAdminFailed: (state, { payload }) => {
      return { ...state, detailLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    getAdminAuditLogRequest: (state, payload) => {
      return { ...state, auditLogLoading: true };
    },
    getAdminAuditLogSuccess: (state, { payload }) => {
      return { ...state, auditLogLoading: false, history: payload.data };
    },
    getAdminAuditLogFailed: (state, { payload }) => {
      return { ...state, auditLogLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    createAdminRequest: (state, payload) => {
      return { ...state, loading: true }
    },
    createAdminSuccess: (state, { payload }) => {
      return { ...state, loading: false, createflag: true, message: payload.message };
    },
    createAdminFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    deleteAdminRequest: (state) => {
      return { ...state, deleteflag: false, loading: true }
    },
    deleteAdminSuccess: (state, { payload }) => {
      return { ...state, loading: false, deleteflag: true, message: payload.message };
    },
    deleteAdminFailed: (state, { payload }) => {
      return { ...state, loading: false, deleteflag: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    sendInvitationRequest: (state, action) => {
      return { ...state, inviteLoading: true, invitedflag: false };
    },
    sendInvitationSuccess: (state, { payload }) => {
      return {
        ...state, inviteLoading: false, invitedflag: true, searchedCompanies: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    sendInvitationFailed: (state, { payload }) => {
      return { ...state, inviteLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    reSendInvitationRequest: (state, action) => {
      return { ...state, reInviteLoading: true, reInvitedFlag: false };
    },
    reSendInvitationSuccess: (state, { payload }) => {
      return { ...state, reInviteLoading: false, reInvitedFlag: true };
    },
    reSendInvitationFailed: (state, { payload }) => {
      return { ...state, reInviteLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    sendInvitationByMailRequest: (state, action) => {
      return { ...state, inviteByMailLoading: true, invitedByMailflag: false };
    },
    sendInvitationByMailSuccess: (state, { payload }) => {
      return {
        ...state, inviteByMailLoading: false, invitedByMailflag: true, searchedCompanies: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    sendInvitationByMailFailed: (state, { payload }) => {
      return { ...state, inviteByMailLoading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    adminReset: (state) => {
      return { ...state, ...initialState };
    },

    adminDetailReset: (state) => {
      return { ...state, detail: {}, message: "" };
    },

    adminHistoryReset: (state) => {
      return { ...state, history: [] };
    },

    searchedAdminReset: (state) => {
      return { ...state, searchedCompanies: [] };
    },

    adminAddFilter: (state, { payload }) => {
      return { ...state, adminFilter: { ...payload } };
    },

    adminResetFilter: (state) => {
      return { ...state, adminFilter: {} };
    },

  }
});

// Actions
export const {
  getAdminRequest, getAdminSuccess, getAdminFailed,
  adminListRequest, adminListSuccess, adminListFailed,
  createAdminRequest, createAdminSuccess, createAdminFailed,
  deleteAdminRequest, deleteAdminSuccess, deleteAdminFailed,
  adminAllListRequest, adminAllListSuccess, adminAllListFailed,
  adminReset, adminDetailReset, adminAddFilter, adminResetFilter,
  sendInvitationRequest, sendInvitationSuccess, sendInvitationFailed,
  searchCompaniesRequest, searchCompaniesSuccess, searchCompaniesFailed,
  reSendInvitationRequest, reSendInvitationSuccess, reSendInvitationFailed,
  getAdminAuditLogRequest, getAdminAuditLogSuccess, getAdminAuditLogFailed,
  sendInvitationByMailRequest, sendInvitationByMailSuccess, sendInvitationByMailFailed,
  searchedAdminReset, adminHistoryReset
} = slice.actions;

// Reducers
export default slice.reducer;
