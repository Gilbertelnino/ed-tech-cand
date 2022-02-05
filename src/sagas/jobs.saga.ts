import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import {
	getJobRequest, getJobSuccess, getJobFailed,
	jobListRequest, jobListSuccess, jobListFailed,
	jobTypesRequest, jobTypesSuccess, jobTypesFailed,
	jobStatusRequest, jobStatusSuccess, jobStatusFailed,
	deleteJobRequest, deleteJobSuccess, deleteJobFailed,
	jobLevelsRequest, jobLevelsSuccess, jobLevelsFailed,
	updateJobRequest, updateJobSuccess, updateJobFailed,
	createJobRequest, createJobSuccess, createJobFailed,
	archiveJobRequest, archiveJobSuccess, archiveJobFailed,
	salaryRangesRequest, salaryRangesSuccess, salaryRangesFailed,
	publicJobListRequest,
	jobDepartmentListSuccess, jobDepartmentListFailed, jobDepartmentListRequest
} from '../reducers/job/jobs.reducer';
import jobServices from '../services/jobs.services';
import { get } from "lodash";
const _ = { get };
interface payloadInterface {
	type: String
	payload: any
}

// Job List
function* getJobListWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getJobs, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(jobListSuccess({ message: response.message, data: data }));
			} else {
				yield put(jobListFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(jobListFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(jobListFailed({ message: error.message }));
	}
}

export function* getJobListWatcher() {
	yield takeLatest(jobListRequest.type, getJobListWorker);
}

// Public Job List
function* getPublicJobListWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getPublicJobs, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(jobListSuccess({ message: response.message, data: data }));
			} else {
				yield put(jobListFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(jobListFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(jobListFailed({ message: error.message }));
	}
}

export function* getPublicJobListWatcher() {
	yield takeLatest(publicJobListRequest.type, getPublicJobListWorker);
}

// Get Job
function* getJobWorker({ payload }: payloadInterface) {
	// calling the API
	const response = yield* call(jobServices.getJobDetail, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', {});
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(getJobSuccess({ message: response.message, data: data }));
			} else {
				yield put(getJobFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(getJobFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(getJobFailed({ message: error.message }));
	}
}

export function* getJobWatcher() {
	yield takeLatest(getJobRequest.type, getJobWorker);
}

// Job Create
function* jobCreateWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.createJob, payload);

	try {
		if (response.flag === true) {
			yield put(createJobSuccess({ message: response.message }));
		} else {
			const errors = _.get(response, 'errors', {});
			yield put(createJobFailed({
				message: (response.message || ""),
				errors: errors
			}));
		}
	} catch (error) {
		yield put(createJobFailed({ message: error.message }));
	}
}

export function* jobCreateWatcher() {
	yield takeLatest(createJobRequest.type, jobCreateWorker);
}

// Delete Create
function* jobDeleteWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.deleteJob, payload);

	try {
		if (response.flag === true) {
			yield put(deleteJobSuccess({ message: response.message }));
		} else {
			const errors = _.get(response, 'errors', {});
			yield put(deleteJobFailed({
				message: (response.message || ""),
				errors: errors
			}));
		}
	} catch (error) {
		yield put(deleteJobFailed({ message: error.message }));
	}
}

export function* jobDeleteWatcher() {
	yield takeLatest(deleteJobRequest.type, jobDeleteWorker);
}

// Job Update
function* jobUpdateWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.updateJob, payload);

	try {
		if (response.flag === true) {
			yield put(updateJobSuccess({ message: response.message }));
		} else {
			const errors = _.get(response, 'errors', {});
			yield put(updateJobFailed({
				message: (response.message || ""),
				errors: errors
			}));
		}
	} catch (error) {
		yield put(updateJobFailed({ message: error.message }));
	}
}

export function* jobUpdateWatcher() {
	yield takeLatest(updateJobRequest.type, jobUpdateWorker);
}

// Archive Update
function* jobArchiveWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.archiveJob, payload);

	try {
		if (response.flag === true) {
			yield put(archiveJobSuccess({ message: response.message }));
		} else {
			const errors = _.get(response, 'errors', {});
			yield put(archiveJobFailed({
				message: (response.message || ""),
				errors: errors
			}));
		}
	} catch (error) {
		yield put(archiveJobFailed({ message: error.message }));
	}
}

export function* jobArchiveWatcher() {
	yield takeLatest(archiveJobRequest.type, jobArchiveWorker);
}

// Job Types List
function* getJobTypesWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getJobTypes, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(jobTypesSuccess({ message: response.message, data: data }));
			} else {
				yield put(jobTypesFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(jobTypesFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(jobTypesFailed({ message: error.message }));
	}
}

export function* getJobTypesWatcher() {
	yield takeLatest(jobTypesRequest.type, getJobTypesWorker);
}

// Job Levels List
function* getJobLevelsWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getJobLevels, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(jobLevelsSuccess({ message: response.message, data: data }));
			} else {
				yield put(jobLevelsFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(jobLevelsFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(jobLevelsFailed({ message: error.message }));
	}
}

export function* getJobLevelsWatcher() {
	yield takeLatest(jobLevelsRequest.type, getJobLevelsWorker);
}

// Salary Range List
function* getSalaryRangesWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getSalaryRanges, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(salaryRangesSuccess({ message: response.message, data: data }));
			} else {
				yield put(salaryRangesFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(salaryRangesFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(salaryRangesFailed({ message: error.message }));
	}
}

export function* getSalaryRangesWatcher() {
	yield takeLatest(salaryRangesRequest.type, getSalaryRangesWorker);
}

// Salary Range List
function* getJobStatusWorker({ payload }: payloadInterface) {

	// calling the API
	const response = yield* call(jobServices.getJobStatuses, payload);

	try {
		if (response.flag === true) {
			const data = _.get(response, 'data', []);
			const errors = _.get(response, 'errors', {});
			if (data) {
				yield put(jobStatusSuccess({ message: response.message, data: data }));
			} else {
				yield put(jobStatusFailed({
					message: response.message,
					errors: errors
				}));
			}
		} else {
			yield put(jobStatusFailed({ message: response.message }));
		}
	} catch (error) {
		yield put(jobStatusFailed({ message: error.message }));
	}
}

export function* getJobStatusWatcher() {
	yield takeLatest(jobStatusRequest.type, getJobStatusWorker);
}

// department List
function* getdepartmentListWorker() {
	// calling the API
	const response = yield* call(jobServices.getJobDepartments);
	try {
	  if (response.flag === true) {
		const data = _.get(response, "data", []);
		if (data) {
		  yield put(
			jobDepartmentListSuccess({
			  message: _.get(response, "message", ""),
			  data: _.get(response, "data", []),
			})
		  );
		} else {
		  yield put(
			jobDepartmentListFailed({
			  message: _.get(response, "message", ""),
			  errors: _.get(response, "errors", {}),
			})
		  );
		}
	  } else {
		yield put(
		  jobDepartmentListFailed({ message: _.get(response, "message", "") })
		);
	  }
	} catch (error) {
	  yield put(jobDepartmentListFailed({ message: _.get(error, "message", "") }));
	}
  }
  
  export function* getdepartmentListWatcher() {
	yield takeLatest(jobDepartmentListRequest.type, getdepartmentListWorker);
  }