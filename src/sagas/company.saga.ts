import { put, takeLatest } from 'redux-saga/effects';
import { call, delay } from "typed-redux-saga";
import { get, isEmpty } from "lodash";
import companyServices from '../services/company.services';
import { tabChangeRequest, tabChangeSuccess } from '../../src/reducers/company/tabChange.reducer';
import { updateCompanyBasicInfoRequest, updateCompanyBasicInfoSuccess, updateCompanyBasicInfoFail, verifyTokenRequest, verifyTokenSuccess, verifyTokenFail, passwordUpdateRequest, passwordUpdateSuccess, passwordUpdateFail } from '../reducers/company/basicInfo.reducer';
import { getCompanyProfileDetailRequest, getCompanyProfileDetailSuccess, getCompanyProfileDetailFail } from '../reducers/company/companyPublicProfile.reducer';
import {
  getCompanyDetailRequest, getCompanyDetailSuccess, getCompanyDetailFail,
  updateCompanyProfileRequest, updateCompanyProfileSuccess, updateCompanyProfileFailed,
  uploadCompanyFileRequest, uploadCompanyFileFailed, uploadCompanyFileSuccess,
  uploadCompanyProfileImageRequest, uploadCompanyProfileImageFailed, uploadCompanyProfileImageSuccess,
  uploadCompanyBannerImageRequest, uploadCompanyBannerImageFailed, uploadCompanyBannerImageSuccess,
  deleteVideoRequest, deleteVideoSuccess, deleteVideoFailed
} from '../reducers/company/companyProfile.reducer';
const _ = { get, isEmpty };

interface payloadInterface {
  type: String
  payload: Object
}

function* tabChangeWorker({ payload }: payloadInterface) {
  if (!_.isEmpty(payload)) {
    yield put(tabChangeSuccess(payload));
  }
}

export function* tabChangeWatcher() {
  yield takeLatest(tabChangeRequest.type, tabChangeWorker);
}

// Login User
function* updateCompanyBasicInfoWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.updateCompanyBasicInfo, payload);

  try {
    if (response.flag === true) {
      const token = _.get(response, "data.token", "");
      // verify token and re-store it
      yield put(updateCompanyBasicInfoSuccess({
        message: response.message
      }));
    } else {
      yield put(updateCompanyBasicInfoFail({
        message: response.message,
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error) {
    yield put(updateCompanyBasicInfoFail({ message: _.get(error, "message", "Something went wrong") }));
  }
}

export function* updateCompanyBasicInfoWatcher() {
  yield takeLatest(updateCompanyBasicInfoRequest.type, updateCompanyBasicInfoWorker);
}

// Get company detail.
function* getCompanyDetailWorker() {
  // calling the API
  const response = yield* call(companyServices.getCompanyDetail);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(getCompanyDetailSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(getCompanyDetailFail({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(getCompanyDetailFail({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getCompanyDetailFail({ message: _.get(error, "message", "") }));
  }
}

export function* getCompanyDetailWatcher() {
  yield takeLatest(getCompanyDetailRequest.type, getCompanyDetailWorker);
}


// Company Profile Update
function* companyProfileUpdateWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.updateCompanyProfile, payload);

  try {
    if (response.flag === true) {
      yield put(updateCompanyProfileSuccess({ message: response.message }));
    } else {
      const errors = _.get(response, 'errors', {});
      yield put(updateCompanyProfileFailed({
        message: (response.message || ""),
        errors: errors
      }));
    }
  } catch (error) {
    yield put(updateCompanyProfileFailed({ message: _.get(error, "message", "Something went wrong") }));
  }
}

export function* companyProfileUpdateWatcher() {
  yield takeLatest(updateCompanyProfileRequest.type, companyProfileUpdateWorker);
}

// File Upload
function* companyFileUploadWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.uploadCompanyFile, payload);

  try {
    if (response.flag === true) {
      yield put(uploadCompanyFileSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
    } else {
      yield put(uploadCompanyFileFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(uploadCompanyFileFailed({ message: _.get(error, "message", "") }));
  }
}

export function* companyFileUploadWatcher() {
  yield takeLatest(uploadCompanyFileRequest.type, companyFileUploadWorker);
}

// Profile Image Upload
function* uploadCompanyProfileImageWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.uploadCompanyFile, payload);

  try {
    if (response.flag === true) {
      yield put(uploadCompanyProfileImageSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", {}) }));
    } else {
      yield put(uploadCompanyProfileImageFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(uploadCompanyProfileImageFailed({ message: _.get(error, "message", "") }));
  }
}

export function* uploadCompanyProfileImageWatcher() {
  yield takeLatest(uploadCompanyProfileImageRequest.type, uploadCompanyProfileImageWorker);
}

// Banner Upload
function* uploadCompanyBannerImageWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.uploadCompanyFile, payload);

  try {
    if (response.flag === true) {
      yield put(uploadCompanyBannerImageSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
    } else {
      yield put(uploadCompanyBannerImageFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(uploadCompanyBannerImageFailed({ message: _.get(error, "message", "") }));
  }
}

export function* uploadCompanyBannerImageWatcher() {
  yield takeLatest(uploadCompanyBannerImageRequest.type, uploadCompanyBannerImageWorker);
}


// Delete Company Profile Video
function* jobDeleteWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.deleteVideo, payload);

  try {
    if (response.flag === true) {
      yield put(deleteVideoSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(deleteVideoFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(deleteVideoFailed({ message: _.get(error, "message", "") }));
  }
}

export function* jobDeleteWatcher() {
  yield takeLatest(deleteVideoRequest.type, jobDeleteWorker);
}

// Get company public profile detail.
function* getCompanyPublicProfileDetailWorker({ payload }: payloadInterface) {
  // calling the API
  const slug = _.get(payload, "slug", "");
  const response = yield* call(companyServices.fetchCompanyPublicProfile, slug);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(getCompanyProfileDetailSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(getCompanyProfileDetailFail({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(getCompanyProfileDetailFail({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getCompanyProfileDetailFail({ message: _.get(error, "message", "") }));
  }
}

export function* getCompanyPublicProfileDetailWatcher() {
  yield takeLatest(getCompanyProfileDetailRequest.type, getCompanyPublicProfileDetailWorker);
}

// Verify Tokan
function* verifyTokenWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.verifyToken, payload);
  try {
    if (response.flag === true) {

      yield put(verifyTokenSuccess({
        message: _.get(response, "message", ""),
        data: _.get(response, "data", {})
      }));
    } else {
      yield put(verifyTokenFail({
        message: response.message,
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error: any) {
    yield put(verifyTokenFail({ message: error.message }));
  }
}

export function* verifyTokenWatcher() {
  yield takeLatest(verifyTokenRequest.type, verifyTokenWorker);
}

// Update Password
function* passwordUpdateWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(companyServices.passwordUpdate, payload);
  try {
    if (_.get(response, 'flag', false) === true) {

      yield put(passwordUpdateSuccess({
        message: _.get(response, "message", ""),
        data: _.get(response, "data", {})
      }));
    } else {
      yield put(passwordUpdateFail({
        message: _.get(response, 'message', ''),
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error: any) {
    yield put(passwordUpdateFail({ message: error.message }));
  }
}

export function* passwordUpdateWatcher() {
  yield takeLatest(passwordUpdateRequest.type, passwordUpdateWorker);
}
