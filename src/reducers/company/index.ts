import { combineReducers } from 'redux';
import tabChangeReducer from './tabChange.reducer';
import companyCandidatesReducer from "./companyCandidates.reducer";
import basicInfoReducer from "./basicInfo.reducer";
import companyProfileReducer from "./companyProfile.reducer";
import companyPublicProfileReducer from "./companyPublicProfile.reducer";
import companyAdminsReducer from "./companyAdmins.reducer";
import companyCandidateApplicationsReducer from "./companyCandidateApplications.reducer";

export default combineReducers({
  tab: tabChangeReducer,
  companyCandidates: companyCandidatesReducer,
  basicInfo: basicInfoReducer,
  companyProfile: companyProfileReducer,
  companyPublicProfile: companyPublicProfileReducer,
  companyAdmins: companyAdminsReducer,
  candidateApplications: companyCandidateApplicationsReducer
});
