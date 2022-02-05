import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import {
  getPeopleRequest, getPeopleSuccess, getPeopleFailed,
  peopleListRequest, peopleListSuccess, peopleListFailed,
  createPeopleRequest, createPeopleSuccess, createPeopleFailed,
  deletePeopleRequest, deletePeopleSuccess, deletePeopleFailed,
  updatePeopleRequest, updatePeopleSuccess, updatePeopleFailed,
  uploadPeopleFileRequest, uploadPeopleFileSuccess, uploadPeopleFileFailed
} from '../reducers/people/people.reducer';
import peopleServices from '../services/people.services';
import _ from "lodash";

interface payloadInterface {
  type: String
  payload: any
}

// People List
function* getPeopleListWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(peopleServices.getPeople, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(peopleListSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(peopleListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(peopleListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(peopleListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getPeopleListWatcher() {
  yield takeLatest(peopleListRequest.type, getPeopleListWorker);
}

// Get People
function* getPeopleWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(peopleServices.getPeopleDetail, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', {});
      if (data) {
        yield put(getPeopleSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", {}) }));
      } else {
        yield put(getPeopleFailed({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    } else {
      yield put(getPeopleFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getPeopleFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getPeopleWatcher() {
  yield takeLatest(getPeopleRequest.type, getPeopleWorker);
}

// People Create
function* peopleCreateWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(peopleServices.createPeople, payload);

  try {
    if (response.flag === true) {
      yield put(createPeopleSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(createPeopleFailed({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error) {
    yield put(createPeopleFailed({ message: _.get(error, "message", "") }));
  }
}

export function* peopleCreateWatcher() {
  yield takeLatest(createPeopleRequest.type, peopleCreateWorker);
}

// Delete People
function* peopleDeleteWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(peopleServices.deletePeople, payload);

  try {
    if (response.flag === true) {
      yield put(deletePeopleSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(deletePeopleFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(deletePeopleFailed({ message: _.get(error, "message", "") }));
  }
}

export function* peopleDeleteWatcher() {
  yield takeLatest(deletePeopleRequest.type, peopleDeleteWorker);
}

// People Update
function* peopleUpdateWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(peopleServices.updatePeople, payload);

  try {
    if (response.flag === true) {
      yield put(updatePeopleSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(updatePeopleFailed({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error) {
    yield put(updatePeopleFailed({ message: _.get(error, "message", "") }));
  }
}

export function* peopleUpdateWatcher() {
  yield takeLatest(updatePeopleRequest.type, peopleUpdateWorker);
}

// Image Upload
function* peopleFileUploadWorker({ payload }: payloadInterface) {

  // calling the API
  const fileSeries = _.get(payload, "series", "");
  const param = _.omit(payload, "series");
  const response = yield* call(peopleServices.uploadPeopleFile, param);
  try {
    if (response.flag === true) {
      yield put(uploadPeopleFileSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []), series: fileSeries }));
    } else {
      yield put(uploadPeopleFileFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(uploadPeopleFileFailed({ message: _.get(error, "message", "") }));
  }
}

export function* peopleFileUploadWatcher() {
  yield takeLatest(uploadPeopleFileRequest.type, peopleFileUploadWorker);
}
