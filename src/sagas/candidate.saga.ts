import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import {
  applyJobRequest, applyJobSuccess, applyJobFailed,
  deleteVideoRequest, deleteVideoSuccess, deleteVideoFailed,
  updateCandidateRequest, updateCandidateSuccess, updateCandidateFailed,
  companyCandidatesRequest, companyCandidatesSuccess, companyCandidatesFail,
  uploadCandidateFileRequest, uploadCandidateFileSuccess, uploadCandidateFileFailed,
  getCandidateProfileDetailRequest, getCandidateProfileDetailSuccess, getCandidateProfileDetailFail,
  getCandidateJobApplicationsRequest, getCandidateJobApplicationsAppliedSuccess, getCandidateJobApplicationsSavedSuccess,
  getCandidateJobApplicationsFailed, getCandidateJobApplicationsFulfilled ,saveJobSuccess, saveJobFailed, saveJobRequest
} from '../reducers/candidate/candidate.reducer';
import candidateServices from '../services/candidate.services';
import { verifyToken } from '../utils/appUser';
import { get } from "lodash";
const _ = { get };

interface payloadInterface {
  type: String
  payload: any
}


// Get candidate profile detail.
function* getCandidateProfileDetailWorker({ payload }: payloadInterface) {
  // calling the API
  const slug = _.get(payload, "slug", "");
  const response = yield* call(candidateServices.fetchCandidatePublicProfile, slug);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(getCandidateProfileDetailSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(getCandidateProfileDetailFail({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(getCandidateProfileDetailFail({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(getCandidateProfileDetailFail({ message: _.get(error, "message", "") }));
  }
}

export function* getCandidateProfileDetailWatcher() {
  yield takeLatest(getCandidateProfileDetailRequest.type, getCandidateProfileDetailWorker);
}

// Candidate Update
function* candidateUpdateWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(candidateServices.updateCandidate, payload);

  try {
    if (response.flag === true) {
      yield put(updateCandidateSuccess({ message: _.get(response, "message", "") }));
    } else {
      yield put(updateCandidateFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(updateCandidateFailed({ message: _.get(error, "message", "") }));
  }
}

export function* candidateUpdateWatcher() {
  yield takeLatest(updateCandidateRequest.type, candidateUpdateWorker);
}

// Candidate Apply Job
function* candidateApplyJobWorker({ payload }: payloadInterface) {
  const response = yield* call(candidateServices.candidateApplyJob, payload);

  try {
    if (response.flag === true) {
      yield put(applyJobSuccess({ message: response.message }));
      yield put(getCandidateJobApplicationsRequest({}));
    } else {
      yield put(applyJobFailed({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {})
      }))
    }
  } catch (error) {
    yield put(applyJobFailed({ message: error.message }));
  }
}

export function* candidateApplyJobWatcher() {
  yield takeLatest(applyJobRequest.type, candidateApplyJobWorker);
}

// Candidate save Job
function* candidateSaveJobWorker({ payload }: payloadInterface) {
  const response = yield* call(candidateServices.candidateSaveJob, payload);

  try {
    if (response.flag === true) {
      yield put(saveJobSuccess({ message: response.message }));
      yield put(getCandidateJobApplicationsRequest({}));
    } else {
      yield put(saveJobFailed({
        message: _.get(response, "message", ""),
        errors: _.get(response, "errors", {})
      }))
    }
  } catch (error:any) {
    yield put(saveJobFailed({ message: error.message }));
  }
}

export function* candidateSaveJobWatcher() {
  yield takeLatest(saveJobRequest.type, candidateSaveJobWorker);
}

function* getCompanyCandidatesListWorker({ payload }: payloadInterface) {
  const response = yield* call(candidateServices.companyCandidatesList, payload);

  try {
    if (response.flag) {
      const data = _.get(response, 'data', {});
      if (data) {
        yield put(companyCandidatesSuccess({
          message: _.get(response, "message", ""),
          data: data
        }));
      }
      else {
        yield put(companyCandidatesFail({
          message: _.get(response, "message", ""),
          errors: _.get(payload, "errors", {})
        }));
      }
    }

    else {
      yield put(companyCandidatesFail({
        message: _.get(response, "message", "")
      }));
    }

  } catch (error) {
    yield put(companyCandidatesFail({
      message: _.get(error, "message", "")
    }));
  }
}

export function* getCompanyCandidatesListWatcher() {
  yield takeLatest(companyCandidatesRequest.type, getCompanyCandidatesListWorker);
}

// Candidate Profile Upload
function* candidateFileUploadWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(candidateServices.uploadCandidateFile, payload);

  try {
    if (response.flag === true) {
      yield put(uploadCandidateFileSuccess({ data: _.get(response, "data", {}), message: _.get(response, "message", "") }));
    } else {
      yield put(uploadCandidateFileFailed({
        message: _.get(response, "message", ""),
        errors: _.get(payload, "errors", {})
      }));
    }
  } catch (error) {
    yield put(uploadCandidateFileFailed({ message: _.get(error, "message", "") }));
  }
}

export function* candidateFileUploadWatcher() {
  yield takeLatest(uploadCandidateFileRequest.type, candidateFileUploadWorker);
}

// Delete Video
function* videoDeleteWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(candidateServices.deleteVideo);

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

export function* videoDeleteWatcher() {
  yield takeLatest(deleteVideoRequest.type, videoDeleteWorker);
}

// Job Applications
function* candidateJobApplicationsWorker({payload}:payloadInterface){
  try {
    const responseApplied = yield* call(candidateServices.candidateJobApplicationList, {type: "applied",...payload });
    const responseSaved = yield* call(candidateServices.candidateJobApplicationList, {type: "saved",...payload });
    yield put(getCandidateJobApplicationsAppliedSuccess({ data: responseApplied }));
    yield put(getCandidateJobApplicationsSavedSuccess({ data: responseSaved }));
    yield put(getCandidateJobApplicationsFulfilled());
  } catch (error:any) {
    yield put(getCandidateJobApplicationsFailed({message:error.message}))
  }
}

export function* candidateJobApplicationsWatcher(){
  yield takeLatest(getCandidateJobApplicationsRequest.type,candidateJobApplicationsWorker);
}