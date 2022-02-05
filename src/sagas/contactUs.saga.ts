import { get } from "lodash";
import { call } from "typed-redux-saga";
import { put, takeLatest } from 'redux-saga/effects';
import contactUsServices from '../services/contactUs.services';
import {
  companyFeedbackTypeRequest, companyFeedbackTypeSuccess, companyFeedbackTypeFailed,
  submitFeedbackRequest, submitFeedbackSuccess, submitFeedbackFailed,
  candidateFeedbackTypeSuccess
} from '../reducers/contactUs/contactUs.reducer';

const _ = { get };

interface iPayload {
  type: String
  payload: any
}

// Fetch feedback types List
function* fetchFeedbackTypeWorker({ payload }: iPayload) {

  const companyResponse = yield* call(contactUsServices.fetchFeedbackTypes, "company");
  const candidateResponse = yield* call(contactUsServices.fetchFeedbackTypes, "candidate");

  try {
    if (companyResponse.flag === true) {

      // Set company feedback
      yield put(companyFeedbackTypeSuccess({
        data: _.get(companyResponse, "data", [])
      }));

      // Set candidate feedback
      yield put(candidateFeedbackTypeSuccess({
        data: _.get(candidateResponse, "data", [])
      }));
    } else {
      yield put(companyFeedbackTypeFailed({
        message: _.get(companyResponse, "message", "")
      }));
    }
  } catch (error) {
    yield put(companyFeedbackTypeFailed({ message: _.get(error, "message", "") }));
  }
}

export function* fetchFeedbackTypeWatcher() {
  yield takeLatest(companyFeedbackTypeRequest.type, fetchFeedbackTypeWorker);
}

// Submit feedback form
function* submitFeedbackFormWorker({ payload }: iPayload) {

  const response = yield* call(contactUsServices.submitFeedbackForm, payload);

  try {
    if (response.flag === true) {

      // Set candidate feedback
      yield put(submitFeedbackSuccess({
        message: _.get(response, "message", "")
      }));
    } else {
      yield put(submitFeedbackFailed({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {}),
      }));
    }
  } catch (error) {
    yield put(submitFeedbackFailed({ message: _.get(error, "message", "") }));
  }
}

export function* submitFeedbackFormWatcher() {
  yield takeLatest(submitFeedbackRequest.type, submitFeedbackFormWorker);
}
