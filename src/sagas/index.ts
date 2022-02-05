import { all, fork } from "redux-saga/effects";

import * as jobSaga from "./jobs.saga";
import * as authSaga from "./auth.saga";
import * as commonSaga from "./common.saga";
import * as peopleSaga from "./people.saga";
import * as companySaga from "./company.saga";
import * as messageSaga from "./messages.saga";
import * as industrySaga from "./industry.saga";
import * as candidateSaga from "./candidate.saga";
import * as contactUsSaga from "./contactUs.saga";
import * as currencySaga from "./currencies.saga";
import * as videoStudioSaga from "./videoStudio.saga";
import * as employeeSizeSaga from "./employeeSize.saga";
import * as companyAdminSaga from "./companyAdmins.saga";
import * as companyDashboardSaga from "./companyDashboard.saga";
import * as searchAndConnectSaga from "./searchAndConnect.saga";
import * as connectionNotification from "./connectionNotification.saga";
import * as companyCandidateApplicationsSaga from "./companyCandidateApplications.saga";

export default function* rootSaga() {
  yield all([
    ...Object.values(jobSaga),
    ...Object.values(authSaga),
    ...Object.values(peopleSaga),
    ...Object.values(commonSaga),
    ...Object.values(companySaga),
    ...Object.values(messageSaga),
    ...Object.values(industrySaga),
    ...Object.values(currencySaga),
    ...Object.values(candidateSaga),
    ...Object.values(contactUsSaga),
    ...Object.values(videoStudioSaga),
    ...Object.values(employeeSizeSaga),
    ...Object.values(companyAdminSaga),
    ...Object.values(companyDashboardSaga),
    ...Object.values(searchAndConnectSaga),
    ...Object.values(connectionNotification),
    ...Object.values(companyCandidateApplicationsSaga),
  ].map(fork));
}
