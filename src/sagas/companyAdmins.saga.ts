import { put, takeLatest } from 'redux-saga/effects';
import {
  getAdminRequest, getAdminSuccess, getAdminFailed,
  adminListRequest, adminListSuccess, adminListFailed,
  createAdminRequest, createAdminSuccess, createAdminFailed,
  adminAllListRequest, adminAllListSuccess, adminAllListFailed,
  deleteAdminRequest, deleteAdminSuccess, deleteAdminFailed,
  searchCompaniesRequest, searchCompaniesSuccess, searchCompaniesFailed,
  sendInvitationRequest, sendInvitationSuccess, sendInvitationFailed,
  reSendInvitationRequest, reSendInvitationSuccess, reSendInvitationFailed,
  getAdminAuditLogRequest, getAdminAuditLogSuccess, getAdminAuditLogFailed,
  sendInvitationByMailRequest, sendInvitationByMailSuccess, sendInvitationByMailFailed
} from '../reducers/company/companyAdmins.reducer';
import adminServices from '../services/admin.services';
import { call } from "typed-redux-saga";
import { get } from "lodash";

const _ = { get };

interface payloadInterface {
  type: String
  payload: any
}

// Admin List
function* getAdminListWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.getAdmin, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(adminListSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(adminListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(adminListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(adminListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getAdminListWatcher() {
  yield takeLatest(adminListRequest.type, getAdminListWorker);
}
// Admin All List
function* getAdminAllListWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.getAllAdmins);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(adminAllListSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(adminAllListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(adminAllListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(adminAllListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getAdminAllListWatcher() {
  yield takeLatest(adminAllListRequest.type, getAdminAllListWorker);
}

// Get Admin
function* getAdminWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.getAdminDetail, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', {});
      if (data) {
        yield put(getAdminSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", {}) }));
      } else {
        yield put(getAdminFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(getAdminFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getAdminFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getAdminWatcher() {
  yield takeLatest(getAdminRequest.type, getAdminWorker);
}

// Get Admin History
function* getAdminAuditLogWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.getAdminHistory, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', {});
      if (data) {
        yield put(getAdminAuditLogSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", {}) }));
      } else {
        yield put(getAdminAuditLogFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(getAdminAuditLogFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getAdminAuditLogFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getAdminAuditLogWatcher() {
  yield takeLatest(getAdminAuditLogRequest.type, getAdminAuditLogWorker);
}

// Admin Create
function* adminCreateWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(adminServices.createAdmin, payload);

  try {
    if (response.flag === true) {
      yield put(createAdminSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(createAdminFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(createAdminFailed({ message: _.get(error, "message", "") }));
  }
}

export function* adminCreateWatcher() {
  yield takeLatest(createAdminRequest.type, adminCreateWorker);
}

// Delete Admin
function* adminDeleteWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(adminServices.deleteAdmin, payload);

  try {
    if (response.flag === true) {
      yield put(deleteAdminSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(deleteAdminFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(deleteAdminFailed({ message: _.get(error, "message", "") }));
  }
}

export function* adminDeleteWatcher() {
  yield takeLatest(deleteAdminRequest.type, adminDeleteWorker);
}

// Search Companies
function* searchCompaniesWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.searchCompanies, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(searchCompaniesSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(searchCompaniesFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(searchCompaniesFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(searchCompaniesFailed({ message: _.get(error, "message", "") }));
  }
}

export function* searchCompaniesWatcher() {
  yield takeLatest(searchCompaniesRequest.type, searchCompaniesWorker);
}

// send invitation for admin
function* sendInvitationWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.inviteAdmin, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(sendInvitationSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(sendInvitationFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(sendInvitationFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(sendInvitationFailed({ message: _.get(error, "message", "") }));
  }
}

export function* sendInvitationWatcher() {
  yield takeLatest(sendInvitationRequest.type, sendInvitationWorker);
}

// re-send invitation for admin
function* reSendInvitationWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.reInviteAdmin, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(reSendInvitationSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(reSendInvitationFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(reSendInvitationFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(reSendInvitationFailed({ message: _.get(error, "message", "") }));
  }
}

export function* reSendInvitationWatcher() {
  yield takeLatest(reSendInvitationRequest.type, reSendInvitationWorker);
}

// send invitation for admin by mail
function* sendInvitationByMailWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(adminServices.inviteAdminByMail, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(sendInvitationByMailSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(sendInvitationByMailFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(sendInvitationByMailFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(sendInvitationByMailFailed({ message: _.get(error, "message", "") }));
  }
}

export function* sendInvitationByMailWatcher() {
  yield takeLatest(sendInvitationByMailRequest.type, sendInvitationByMailWorker);
}
