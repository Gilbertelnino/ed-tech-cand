import { get } from "lodash";
import { call } from "typed-redux-saga";
import { put, takeLatest } from 'redux-saga/effects';
import employeeSizeServices from '../services/employeeSize.services';
import { employeeSizeListRequest, employeeSizeListSuccess, employeeSizeListFailed } from '../reducers/employeeSize/employeeSize.reducer';

const _ = { get };

// Employee size list
function* getIndustryListWorker() {
  // calling the API
  const response = yield* call(employeeSizeServices.getEmployeeSize);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(employeeSizeListSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(employeeSizeListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(employeeSizeListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(employeeSizeListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getIndustryListWatcher() {
  yield takeLatest(employeeSizeListRequest.type, getIndustryListWorker);
}