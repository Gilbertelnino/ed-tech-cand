import { put, takeLatest } from 'redux-saga/effects';
import { currencyListRequest, currencyListSuccess, currencyListFailed } from '../reducers/currency/currency.reducer';
import currencyServices from '../services/currencies.services';
import { call } from "typed-redux-saga";
import { get, omit } from "lodash";

const _ = { get, omit };

// Currency List
function* getCurrencyListWorker() {

  // calling the API
  const response = yield* call(currencyServices.getCurrencies);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(currencyListSuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(currencyListFailed({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(currencyListFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(currencyListFailed({ message: _.get(error, "message", "") }));
  }
}

export function* getCurrencyListWatcher() {
  yield takeLatest(currencyListRequest.type, getCurrencyListWorker);
}