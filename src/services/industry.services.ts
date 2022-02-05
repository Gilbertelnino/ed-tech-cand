import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get, omit };

export const getIndustries = () => {
  return httpRequest().get(`${API_URLS.industries}/list`)
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
export default {
  getIndustries,
}
