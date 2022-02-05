import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

interface IInitialState {
  loading: any;
  list: Array<any>;
  pagination: object;
}

// Initial state for reducer
const initialState: IInitialState = {
  loading: null,
  list: [],
  pagination: {}
};

const searchUsersReducer = createSlice({
  name: "MESSAGES",
  initialState: initialState,
  reducers: {
    fetchUsersListRequest: (state, payload) => {
      return { ...state, loading: true };
    },
    fetchUsersListSuccess: (state, { payload }) => {
      return { ...state, loading: false, list: _.get(payload, "data.list", []), pagination: _.get(payload, "data.pagination", {}) };
    },
    fetchUsersListFailed: (state, { payload }) => {
      return { ...state, loading: false, list: [], pagination: {}, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    },
    resetUsersList: (state) => {
      return { ...initialState };
    },
  }
});

// Actions
export const {
  fetchUsersListRequest, fetchUsersListSuccess, fetchUsersListFailed, resetUsersList
} = searchUsersReducer.actions;

// Export reducers
export default searchUsersReducer.reducer;
