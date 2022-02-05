import httpRequest from "../utils/httpRequest"
import _ from "lodash";
import API_URLS from "../../src/utils/apiUrls";

const fetchCompanyDashboardTiles = () => {
  return httpRequest().get(`${API_URLS.companies}/dashboard/tiles-count`).then(res => {
    return {
      flag: true,
      message: _.get(res, "data.message", ""),
      data: _.get(res, "data.data", {})
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export default {
  fetchCompanyDashboardTiles
}

