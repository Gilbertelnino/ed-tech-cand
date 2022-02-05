import { put, takeLatest } from 'redux-saga/effects';
import { fetchUsersListRequest, fetchUsersListSuccess, fetchUsersListFailed } from '../reducers/messages/usersList.reducer';
import messageServices from '../services/messages.services';
import { call } from "typed-redux-saga";
import { get, omit } from "lodash";

const _ = { get, omit };

interface payloadInterface {
  type: String
  payload: any
}

// Message List
function* fetchUserListWorker({ payload }: payloadInterface) {
  // calling the API
  const response = yield* call(messageServices.fetchUserList, payload);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);

      if (data) {
        yield put(fetchUsersListSuccess({
          message: _.get(response, "message", ""),
          data: {
            list: _.get(response, "data.data", []),
            pagination: _.get(response, "data.pagination", [])
          }
        }));
      } else {
        yield put(fetchUsersListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(fetchUsersListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(fetchUsersListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getMessageWatcher() {
  yield takeLatest(fetchUsersListRequest.type, fetchUserListWorker);
}
