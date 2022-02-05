import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get, omit };

const fetchFeedbackTypes = (filterType: string) => {
  return httpRequest().get(`${API_URLS.feedback}/type/${filterType}`)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "data.message", ""),
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

const submitFeedbackForm = (formData: object) => {
  return httpRequest().post(`${API_URLS.feedback}/submit`, formData)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "data.message", ""),
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

const feedbackFileUpload = (formData: any) => {
  return httpRequest().post(`${API_URLS.feedback}/file-upload`, formData)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "data.message", ""),
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

const contactUsServices = {
  fetchFeedbackTypes, submitFeedbackForm, feedbackFileUpload
}

export default contactUsServices
