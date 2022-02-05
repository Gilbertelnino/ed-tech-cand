import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import {
  notificationListRequest, notificationListSuccess, notificationListFailed,
  clearNotificationRequest, clearNotificationSuccess, clearNotificationFailed
} from '../reducers/ConnectionNotification/connectionNotification.reducer';
import connectionNotificationServices from '../services/connectionNotification.services';
import { get } from "lodash";
const _ = { get };
interface payloadInterface {
  type: String
  payload: any
}

function* notificationListWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(connectionNotificationServices.list, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      const errors = _.get(response, 'errors', {});
      if (data) {
        yield put(notificationListSuccess({ message: response.message, data: data }));
      } else {
        yield put(notificationListFailed({
          message: response.message,
          errors: errors
        }));
      }
    } else {
      yield put(notificationListFailed({ message: response.message }));
    }
  } catch (error) {
    yield put(notificationListFailed({ message: error.message }));
  }
}

export function* notificationListWatcher() {
  yield takeLatest(notificationListRequest.type, notificationListWorker);
}

function* clearNotificationWorker({ payload }: payloadInterface) {

  // calling the API
  const response = yield* call(connectionNotificationServices.clearNotification, payload);

  try {
    if (response.flag === true) {
      yield put(clearNotificationSuccess({ message: response.message}));
    } else {
      const errors = _.get(response, 'errors', {});
      yield put(clearNotificationFailed({
        message: (response.message || ""),
        errors: errors
      }));
    }
  } catch (error) {
    yield put(clearNotificationFailed({ message: error.message }));
  }
}

export function* clearNotificationWatcher() {
  yield takeLatest(clearNotificationRequest.type, clearNotificationWorker);
}