import httpRequest, { openHttpRequest } from "../utils/httpRequest"
import { get, isEmpty, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../../src/utils/apiUrls";
const _ = { get, isEmpty, omit };

export const updateCompanyBasicInfo = (formData: object) => {
  const hasToken = _.get(formData, 'hasToken', '');
  const slug = _.isEmpty(hasToken) ? 'basic-info' : 'admin-basic-info';
  const data = _.omit(formData, "hasToken");
  return httpRequest().patch(`${API_URLS.companies}/${slug}`, data).then(res => {
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

export const searchCompanyByName = (formData: string) => {

  return openHttpRequest().get(`${API_URLS.companies}/search?q=${formData}`).then(res => {
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

export const getCompanyDetail = () => {

  return httpRequest().get(`${API_URLS.companies}/profile`).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
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

export const updateCompanyProfile = (payload: any) => {

  return httpRequest().put(`${API_URLS.companies}/profile`, payload).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
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

export const uploadCompanyFile = (payload: any) => {
  const type = _.get(payload, 'type', 'image');
  const formData = _.get(payload, 'payload', {});
  const url = (type === 'banner') ? `${API_URLS.companies}/upload/banner` : `${API_URLS.companies}/profile/${type}`;

  return httpRequest().post(url, formData)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "message", ""),
        data: _.get(res, "data.data", {})
      };
    }).catch(err => {
      return {
        flag: false,
        message: _.get(err, "response.message", "Something went wrong!"),
        errors: _.get(err, "response.errors", {})
      };
    });
}

export const deleteVideo = (payload: any) => {

  return httpRequest().delete(`${API_URLS.companies}/profile/video`, { data: { ...payload } }).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
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

export const getCompanyCandidateApplications = (payload: any) => {
  const queryString = objectToParams(payload);
  const url = `${API_URLS.companies}/candidates/applications?${queryString}`;

  return httpRequest().get(url).then(res => {
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

export const toggleFavorite = (payload: any) => {

  const applicationId = payload.applicationId;
  const favoriteState = payload.favoriteState;

  const url = `${API_URLS.companies}/favorite/${applicationId}/${favoriteState}`;

  return httpRequest().put(url).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export const updateCandidateStatus = (payload: any) => {
  const statusType = _.get(payload, "statusType", "")
  const params = _.get(payload, "params", {});
  const applicationId = _.get(payload, "applicationId", "");

  const url = `${API_URLS.companies}/candidates/applications/${applicationId}/${statusType}`;

  return httpRequest().put(url, params).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export const fetchCompanyPublicProfile = (slug: string) => {
  return httpRequest().get(`${API_URLS.companies}/profile/public/${slug}`).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
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

export const verifyToken = (formData: object) => {

  return httpRequest().post(`${API_URLS.companies}/admin-verify-link`, formData).then(res => {
    return {
      flag: true,
      message: _.get(res, "data.message", ""),
      data: _.get(res, "data.data.User", {})
    };
  }).catch(err => {
    return {
      flag: false,
      message: _.get(err, "response.data.message", "Something went wrong!"),
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export const passwordUpdate = (formData: object) => {

  return httpRequest().post(`${API_URLS.companies}/update-admin-password`, formData).then(res => {
    return {
      flag: true,
      message: _.get(res, "data.message", ""),
      data: _.get(res, "data.data.User", {})
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
  updateCompanyBasicInfo, searchCompanyByName, getCompanyDetail, updateCompanyProfile, uploadCompanyFile, deleteVideo,
  getCompanyCandidateApplications, fetchCompanyPublicProfile, toggleFavorite, updateCandidateStatus, verifyToken, passwordUpdate
}

