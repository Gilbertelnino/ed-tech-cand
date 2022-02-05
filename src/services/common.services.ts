import httpRequest from "../utils/httpRequest"
import { get } from "lodash";
import API_URLS from "../../src/utils/apiUrls";
import axios from "axios";
const _ = { get };

export const fetchJobTitles = (searchValue: string) => {
  return httpRequest().get(`${API_URLS.jobTitles}?q=${searchValue}`)
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

export const fetchDepartment = (searchValue: string) => {
  return httpRequest().get(`${API_URLS.departments}?q=${searchValue}`)
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

export const fetchQuoteOfTheDay = () => {
  return axios.get("https://quotes.rest/qod?category=inspire&minlength=100")
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "data.message", ""),
        data: {
          quote: _.get(res, "data.contents.quotes[0].quote", ""),
          author: _.get(res, "data.contents.quotes[0].author", ""),
          date: _.get(res, "data.contents.quotes[0].date", "")
        }
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

const commonServices = { fetchJobTitles, fetchDepartment, fetchQuoteOfTheDay };

export default commonServices;
