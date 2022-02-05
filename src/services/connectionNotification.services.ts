import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../utils/apiUrls";

const _ = { get, omit };

export const list = async (payload: any) => {
  const queryString = await objectToParams(payload);
  const url = `${API_URLS.connectionNotificationList}/?${queryString}`;
  return httpRequest().get(url)
    .then(res => {
      return { 
        flag: true,
        message: _.get(res, "message", ""),
        data: _.get(res, "data", {})
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

export const clearNotification = async (id: number) => {
  return httpRequest().delete(`${API_URLS.clearNotification}/${id}`)
    .then(res => {
      return { 
        flag: true,
        message: _.get(res, "message", "")
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
  list, clearNotification
}
