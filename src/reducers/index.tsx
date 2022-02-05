import { combineReducers } from "redux";

import authReducer from './auth/index.reducer';
import companyReducer from './company';
import candidateReducer from './candidate';
import commonReducer from './common/index.reducer';
import jobReducer from './job';
import peopleReducer from './people';
import industryReducer from './industry';
import employeeSizeReducer from './employeeSize';
import contactUsReducer from './contactUs';
import currencyReducer from './currency';
import messageReducer from './messages';
import searchAndConnectReducer from './SearchAndConnect';
import connectionNotification from './ConnectionNotification';
import dashboardReducer from './dashboard';
import sessionReducer from "./auth/session.reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  job: jobReducer,
  common: commonReducer,
  people: peopleReducer,
  message: messageReducer,
  company: companyReducer,
  currency: currencyReducer,
  industry: industryReducer,
  contactUs: contactUsReducer,
  candidate: candidateReducer,
  search: searchAndConnectReducer,
  employeeSize: employeeSizeReducer,
  notification: connectionNotification,
  dashboard: dashboardReducer,
});

export type rootReducersState = ReturnType<typeof rootReducers>;
export default rootReducers;
