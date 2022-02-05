import { createSlice } from '@reduxjs/toolkit';
import { get } from "lodash";
const _ = { get };
// Initial state for reducer
const initialState = {
  loading: false,
  pagination: {},
  data: [],
  message: ""
};

const slice = createSlice({
  name: 'connectionNotifications',
  initialState: initialState,
  reducers: {

    notificationListRequest: (state, action) => {
      return { ...state, loading: true };
    },
    notificationListSuccess: (state, { payload }) => {
      return {
        ...state, loading: false, notificationData: _.get(payload, "data.data", []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    notificationListFailed: (state, { payload }) => {
      return { ...state, loading: false, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

    clearNotificationRequest: (state, action) => {
      return { ...state, 
        // loading: true 
      };
    },
    clearNotificationSuccess: (state, { payload }) => {
      return {
        ...state,
        // loading: false,
        message: _.get(payload, 'message', '')
      };
    },
    clearNotificationFailed: (state, { payload }) => {
      return { ...state, 
        // loading: false, 
        message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },

  }
});

// Actions
export const {
  notificationListRequest, notificationListSuccess, notificationListFailed,
  clearNotificationRequest, clearNotificationSuccess, clearNotificationFailed
} = slice.actions;

// Reducers
export default slice.reducer;
