import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../utils/apiUrls";

const _ = { get, omit };

export const search = async (payload: any) => {
  const queryString = await objectToParams(payload);
  const url = `${API_URLS.search}?${queryString}`;
  return httpRequest().get(url)
    .then(res => {
      return { 
        flag: true,
        message: _.get(res, "message", ""),
        searchTerm: _.get(payload, "q", ""),
        searchType: _.get(payload, "type", ""),
        allResult: _.get(payload, "allResult", false),
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

export const searchAll = async (payload: any) => {
  const queryString = await objectToParams(payload);
  const url = `${API_URLS.searchAll}?${queryString}`;
  return httpRequest().get(url)
    .then(res => {
      return { 
        flag: true,
        message: _.get(res, "message", ""),
        searchTerm: _.get(payload, "q", ""),
        searchType: _.get(payload, "type", ""),
        allResult: _.get(payload, "allResult", false),
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

export const sendInvitation = (formData: any) => {
  return httpRequest().post(`${API_URLS.sendInvitation}`, formData)
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

export const getCandidateProfile = (slug: string) => {
  return httpRequest().get(`${API_URLS.getCandidateProfile}/${slug}`)
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

export const followCompany = (formData: any) => {
  return httpRequest().post(`${API_URLS.followCompany}/${formData.id}/${formData.type}`)
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

export const getConnectionRequests = async (payload: any) => {
  const queryString = await objectToParams(payload);
  return httpRequest().get(`${API_URLS.getReceivedConnectionRequests}?${queryString}`)
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

export const updateCandidateConnection = (formData: any) => {
  return httpRequest().patch(`${API_URLS.updateCandidateConnection}/${formData.id}/${formData.type}?reject_reason=${formData.reject_reason}`)
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
  search, searchAll, sendInvitation, getCandidateProfile, followCompany, getConnectionRequests, updateCandidateConnection
}
