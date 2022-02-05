import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import {
  searchListRequest, searchListSuccess, searchListFailed,
  searchAllRequest, searchAllSuccess, searchAllFailed,
  sendInvitationRequest, sendInvitationSuccess, sendInvitationFailed,
  getCandidateProfileRequest, getCandidateProfileSuccess, getCandidateProfileFailed,
  connectionRequestsListRequest, connectionRequestsListSuccess, connectionRequestsListFailed,
  followCompanyRequest, followCompanySuccess, followCompanyFailed,
  updateCandidateConnectionRequest, updateCandidateConnectionSuccess, updateCandidateConnectionFailed,
} from '../reducers/SearchAndConnect/searchAndConnect.reducer';
import searchAndConnectServices from '../services/searchAndConnect.services';
import { get } from "lodash";
const _ = { get };
interface payloadInterface {
  type: String
  payload: any
}

function* searchListWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.search, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      const errors = _.get(response, 'errors', {});
      if (data) {
        yield put(searchListSuccess({ message: response.message, searchType: _.get(response, "searchType", ""), searchTerm: _.get(response, "searchTerm", ""), allResult: _.get(response, "allResult", false), data: data }));
      } else {
        yield put(searchListFailed({
          message: response.message,
          errors: errors
        }));
      }
    } else {
      yield put(searchListFailed({ message: response.message }));
    }
  } catch (error) {
    yield put(searchListFailed({ message: error.message }));
  }
}

export function* searchListWatcher() {
  yield takeLatest(searchListRequest.type, searchListWorker);
}

function* searchAllWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.searchAll, payload);
  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      const errors = _.get(response, 'errors', {});
      if (data) {
        yield put(searchAllSuccess({ message: response.message, searchType: _.get(response, "searchType", ""), searchTerm: _.get(response, "searchTerm", ""), allResult: _.get(response, "allResult", false), data: data }));
      } else {
        yield put(searchAllFailed({
          message: response.message,
          errors: errors
        }));
      }
    } else {
      yield put(searchAllFailed({ message: response.message }));
    }
  } catch (error) {
    yield put(searchAllFailed({ message: error.message }));
  }
}

export function* searchAllWatcher() {
  yield takeLatest(searchAllRequest.type, searchAllWorker);
}

function* sendInvitationWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(searchAndConnectServices.sendInvitation, payload);

  try {
    if (response.flag === true) {
      yield put(sendInvitationSuccess({ message: response.message }));
    } else {
      const errors = _.get(response, 'errors', {});
      yield put(sendInvitationFailed({
        message: (response.message || ""),
        errors: errors
      }));
    }
  } catch (error) {
    yield put(sendInvitationFailed({ message: error.message }));
  }
}

export function* sendInvitationWatcher() {
  yield takeLatest(sendInvitationRequest.type, sendInvitationWorker);
}

function* getCandidateProfileWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.getCandidateProfile, payload.slug);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      const errors = _.get(response, 'errors', {});
      if (data) {
        yield put(getCandidateProfileSuccess({ message: response.message, data: data }));
      } else {
        yield put(getCandidateProfileFailed({
          message: response.message,
          errors: errors
        }));
      }
    } else {
      yield put(getCandidateProfileFailed({ message: response.message }));
    }
  } catch (error) {
    yield put(getCandidateProfileFailed({ message: error.message }));
  }
}

export function* getCandidateProfileWatcher() {
  yield takeLatest(getCandidateProfileRequest.type, getCandidateProfileWorker);
}

function* connectionRequestsWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.getConnectionRequests, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      const errors = _.get(response, 'errors', {});
      if (data) {
        yield put(connectionRequestsListSuccess({ message: response.message,  data: data }));
      } else {
        yield put(connectionRequestsListFailed({
          message: response.message,
          errors: errors
        }));
      }
    } else {
      yield put(connectionRequestsListFailed({ message: response.message }));
    }
  } catch (error) {
    yield put(connectionRequestsListFailed({ message: error.message }));
  }
}

export function* connectionRequestsWatcher() {
  yield takeLatest(connectionRequestsListRequest.type, connectionRequestsWorker);
}

function* followCompanyWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.followCompany, payload);

  try {
    if (response.flag === true) {
      yield put(followCompanySuccess({ message: response.message}));
    } else {
      const errors = _.get(response, 'errors', {});
      yield put(followCompanyFailed({
        message: (response.message || ""),
        errors: errors
      }));
    }
  } catch (error) {
    yield put(followCompanyFailed({ message: error.message }));
  }
}

export function* followCompanyWatcher() {
  yield takeLatest(followCompanyRequest.type, followCompanyWorker);
}

function* updateCandidateConnectionWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(searchAndConnectServices.updateCandidateConnection, payload);

  try {
    if (response.flag === true) {
      yield put(updateCandidateConnectionSuccess({ message: response.message}));
    } else {
      const errors = _.get(response, 'errors', {});
      yield put(updateCandidateConnectionFailed({
        message: (response.message || ""),
        errors: errors
      }));
    }
  } catch (error) {
    yield put(updateCandidateConnectionFailed({ message: error.message }));
  }
}

export function* updateCandidateConnectionWatcher() {
  yield takeLatest(updateCandidateConnectionRequest.type, updateCandidateConnectionWorker);
}