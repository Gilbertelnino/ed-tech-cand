import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import _ from "lodash";
import {
	videoStudioListRequest, videoStudioListSuccess, videoStudioListError,
	setPrimaryVideoRequest, setPrimaryVideoSuccess, setPrimaryVideoError,
	createVideoRequest, createVideoSuccess, createVideoError,
	updateVideoRequest, updateVideoSuccess, updateVideoError,
	deleteVideoRequest, deleteVideoSuccess, deleteVideoError,
} from '../reducers/candidate/videoStudio.reducer';

import videoStudioServices from '../services/videoStudio.services';

interface payloadInterface {
	type: String
	payload: any
}

// Get video list
function* fetchVideoStudioWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(videoStudioServices.fetchVideoStudioList);

	try {
		if (response.flag === true) {
			yield put(videoStudioListSuccess({
				message: _.get(response, "message", ""),
				data: _.get(response, "data", {})
			}));
		} else {
			yield put(videoStudioListError({
				message: _.get(response, "message", ""),
				errors: _.get(response, "errors", {})
			}));
		}
	} catch (error) {
		yield put(videoStudioListError({ message: _.get(error, "message", "") }));
	}
}

export function* fetchVideoStudioWatcher() {
	yield takeLatest(videoStudioListRequest.type, fetchVideoStudioWorker);
}

// Create/Add Video
function* createVideoWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(videoStudioServices.createVideo, payload);

	try {
		if (response.flag === true) {
			yield put(createVideoSuccess({
				message: _.get(response, "message", ""),
				data: _.get(response, "data", {})
			}));
		} else {
			yield put(createVideoError({
				message: _.get(response, "message", ""),
				errors: _.get(response, "errors", {})
			}));
		}
	} catch (error) {
		yield put(createVideoError({ message: _.get(error, "message", "") }));
	}
}

export function* createVideoWatcher() {
	yield takeLatest(createVideoRequest.type, createVideoWorker);
}

// Update video
function* updateVideoWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(videoStudioServices.updateVideo, payload);

	try {
		if (response.flag === true) {
			yield put(updateVideoSuccess({
				message: _.get(response, "message", ""),
				data: _.get(response, "data", {})
			}));
		} else {
			yield put(updateVideoError({
				message: _.get(response, "message", ""),
				errors: _.get(response, "errors", {})
			}));
		}
	} catch (error) {
		yield put(updateVideoError({ message: _.get(error, "message", "") }));
	}
}

export function* updateVideoWatcher() {
	yield takeLatest(updateVideoRequest.type, updateVideoWorker);
}

// Delete video
function* deleteVideoWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(videoStudioServices.deleteVideo, payload);

	try {
		if (response.flag === true) {
			yield put(deleteVideoSuccess({
				message: _.get(response, "message", ""),
				data: payload
			}));
		} else {
			yield put(deleteVideoError({
				message: _.get(response, "message", ""),
				errors: _.get(response, "errors", {})
			}));
		}
	} catch (error) {
		yield put(deleteVideoError({ message: _.get(error, "message", "") }));
	}
}

export function* deleteVideoWatcher() {
	yield takeLatest(deleteVideoRequest.type, deleteVideoWorker);
}

// Set primary video
function* setPrimaryVideoWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(videoStudioServices.setPrimaryVideo, payload);

	try {
		if (response.flag === true) {
			yield put(setPrimaryVideoSuccess({
				message: _.get(response, "message", ""),
				data: payload
			}));
		} else {
			yield put(setPrimaryVideoError({
				message: _.get(response, "message", ""),
				errors: _.get(response, "errors", {})
			}));
		}
	} catch (error) {
		yield put(setPrimaryVideoError({ message: _.get(error, "message", "") }));
	}
}

export function* setPrimaryVideoWatcher() {
	yield takeLatest(setPrimaryVideoRequest.type, setPrimaryVideoWorker);
}
