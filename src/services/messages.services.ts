import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import API_URLS from "../utils/apiUrls";
import { objectToParams } from "../utils/helper";

const _ = { get, omit };

const fetchUserList = (queryObj: {}) => {

  let queryString = "";

  if (typeof queryObj === "object") {
    queryString = objectToParams(queryObj);
  }

  return httpRequest().get(`${API_URLS.messages}/users-list?${queryString}`).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
      data: _.get(res, "data", {})
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

const checkChatRoom = (id: {}) => {

  return httpRequest().get(`${API_URLS.messages}/check/chat-room/${id}`).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
      data: _.get(res, "data", {})
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export default { fetchUserList, checkChatRoom }
