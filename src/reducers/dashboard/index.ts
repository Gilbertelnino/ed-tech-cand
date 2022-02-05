import { combineReducers } from 'redux';
import companyDashboardReducer from "./companyDashboard.reducer";

export default combineReducers({
  company: companyDashboardReducer,
});
