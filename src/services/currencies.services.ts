import httpRequest from "../utils/httpRequest"
import { get } from "lodash";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get };

export const getCurrencies = () => {
  return httpRequest().get(`${API_URLS.currencies}`)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "message", ""),
        data: _.get(res, "data.data", {})
      };
    })
    .catch(err => {
      return {
        flag: false,
        message: _.get(err, "response.data.message", "Something went wrong!"),
        errors: _.get(err, "response.data.errors", {})
      };
    });
}

export default { getCurrencies }
