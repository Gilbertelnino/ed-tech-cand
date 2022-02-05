import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import _ from "lodash";
import {
  companyCandidateApplicationsRequest, companyCandidateApplicationsSuccess, companyCandidatesApplicationsFail,
  companyCandidateToggleFavoriteRequest, companyCandidateToggleFavoriteSuccess, companyCandidatesToggleFavoriteFail,
  companyCandidateUpdateStatusRequest, companyCandidateUpdateStatusSuccess, companyCandidateUpdateStatusFail
} from '../reducers/company/companyCandidateApplications.reducer';
import companyServices from '../services/company.services';

interface payloadInterface {
  type: String
  payload: any
}

// get the company candidates list
function* getCompanyCandidatesListWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.getCompanyCandidateApplications, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data.data', []);
      if (data) {
        yield put(companyCandidateApplicationsSuccess({
          message: _.get(response, "message", ""),
          data: _.get(response, "data.data", []),
          pagination: _.get(response, "data.pagination", {})
        }));
      } else {
        yield put(companyCandidatesApplicationsFail({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(companyCandidatesApplicationsFail({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(companyCandidatesApplicationsFail({ message: _.get(error, "message", "") }));
  }
}

export function* getCompanyCandidatesListWatcher() {
  yield takeLatest(companyCandidateApplicationsRequest.type, getCompanyCandidatesListWorker);
}

// Toggle candidate favorite
function* toggleCompanyCandidateFavoriteWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.toggleFavorite, payload);

  try {
    if (response.flag === true) {
      yield put(companyCandidateToggleFavoriteSuccess({
        message: _.get(response, "message", ""),
        data: payload
      }));
    } else {
      yield put(companyCandidatesToggleFavoriteFail({
        message: _.get(response, "message", ""),
        data: _.get(response, "errors", {})
      }));
    }
  }
  catch (error) {
    yield put(companyCandidatesToggleFavoriteFail({ message: _.get(error, "message", "") }));
  }
}

export function* removeCompanyCandidateFavoriteWatcher() {
  yield takeLatest(companyCandidateToggleFavoriteRequest.type, toggleCompanyCandidateFavoriteWorker);
}

// Update Candidate Status
function* updateCandidateStatusWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.updateCandidateStatus, payload);

  try {
    if (response.flag === true) {
      yield put(companyCandidateUpdateStatusSuccess({
        message: _.get(response, "message", ""),
        data: payload
      }));
    } else {
      yield put(companyCandidateUpdateStatusFail({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {})
      }));
    }
  }
  catch (error) {
    yield put(companyCandidateUpdateStatusFail({ message: _.get(error, "message", "") }));
  }
}

export function* updateCandidateStatusWatcher() {
  yield takeLatest(companyCandidateUpdateStatusRequest.type, updateCandidateStatusWorker);
}


