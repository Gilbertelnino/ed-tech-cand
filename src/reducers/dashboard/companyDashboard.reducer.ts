import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

interface IState {
  loading: boolean,
  data: object;
  flag?: any;
  message: string
  errors: object
}

const initialState: IState = {
  loading: false,
  data: {},
  flag: null,
  message: "",
  errors: {}
};

const dashboardTilesReducer = createSlice({
  name: "COMPANY_DASHBOARD",
  initialState: initialState,
  reducers: {

    fetchCompanyDashboardTilesRequest: (state) => {
      return { ...initialState, loading: true };
    },
    fetchCompanyDashboardTilesSuccess: (state, { payload }) => {
      return { ...state, loading: false, flag: true, data: _.get(payload, "data", {}) };
    },
    fetchCompanyDashboardTilesFail: (state, { payload }) => {
      return { ...state, loading: false, flag: false, data: {}, message: _.get(payload, "message", ""), errors: _.get(payload, "errors", {}) };
    }
  }
});

// Export actions
export const {
  fetchCompanyDashboardTilesRequest, fetchCompanyDashboardTilesSuccess, fetchCompanyDashboardTilesFail
} = {
  ...dashboardTilesReducer.actions,
};

// Export reducers
export default combineReducers({
  tiles: dashboardTilesReducer.reducer
});
