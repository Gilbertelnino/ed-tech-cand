import { put, takeLatest } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import _ from "lodash";
import companyDashboardServices from "../services/companyDashboard.services";

import { fetchCompanyDashboardTilesRequest, fetchCompanyDashboardTilesSuccess, fetchCompanyDashboardTilesFail } from "../reducers/dashboard/companyDashboard.reducer";

interface IPayloadInterface {
  type: String
  payload: Object
}

// Company Dashboard tiles
function* fetchCompanyDashboardTilesWorker({ payload }: IPayloadInterface) {

  // calling the API
  const response = yield* call(companyDashboardServices.fetchCompanyDashboardTiles);

  try {
    if (response.flag === true) {
      const data = _.get(response, "data", {});
      if (!_.isEmpty(data)) {
        yield put(fetchCompanyDashboardTilesSuccess({
          message: _.get(response, "message", ""),
          data: _.get(response, "data", {})
        }));
      } else {
        yield put(fetchCompanyDashboardTilesFail({
          message: _.get(response, "message", ""),
          errors: _.get(response, "errors", {})
        }));
      }
    } else {
      yield put(fetchCompanyDashboardTilesFail({ message: _.get(response, "message", "") }));
    }
  } catch (error) {
    yield put(fetchCompanyDashboardTilesFail({ message: _.get(error, "message", "") }));
  }
}

export function* fetchCompanyDashboardTilesWatcher() {
  yield takeLatest(fetchCompanyDashboardTilesRequest.type, fetchCompanyDashboardTilesWorker);
}
