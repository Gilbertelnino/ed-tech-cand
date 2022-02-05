import { get } from "lodash";
import { call } from "typed-redux-saga";
import { put, takeLatest } from 'redux-saga/effects';
import industryServices from '../services/industry.services';
import { fetchQuoteOfTheDayRequest, fetchQuoteOfTheDaySuccess, fetchQuoteOfTheDayFailed } from "../reducers/common/quoteOfTheDay.reducer";
import commonServices from "../services/common.services";


const _ = { get };

// Industry List
function* fetchQuoteOfTheDayWorker() {
  // calling the API
  const response = yield* call(commonServices.fetchQuoteOfTheDay);

  try {
    if (response.flag === true) {
      const data = _.get(response, 'data', []);
      if (data) {
        yield put(fetchQuoteOfTheDaySuccess({ message: _.get(response, "message", ""), data: _.get(response, "data", []) }));
      } else {
        yield put(fetchQuoteOfTheDayFailed({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(fetchQuoteOfTheDayFailed({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(fetchQuoteOfTheDayFailed({ message: _.get(error, "message", "") }));
  }
}

export function* fetchQuoteOfTheDayWatcher() {
  yield takeLatest(fetchQuoteOfTheDayRequest.type, fetchQuoteOfTheDayWorker);
}
