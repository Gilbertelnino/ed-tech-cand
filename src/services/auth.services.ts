import httpRequest, { openHttpRequest } from "../utils/httpRequest"
import { get } from "lodash";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get };

export const login = (formData: any) => {
  return openHttpRequest().post(API_URLS.login, formData)
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

export const logout = (formData: any) => {
  return httpRequest().post(API_URLS.logout, formData)
    .then(res => {
      return {
        flag: true,
        message: _.get(res, "data.message", "")
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


export const candidateSignUp = (formData: any) => {

  const url = (formData.signUpState === "employer") ? API_URLS.companySignUp : API_URLS.candidateSignUp;

  return openHttpRequest().post(url, formData)
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

export const fetchSessionData = (formData: any) => {
  return httpRequest().get(API_URLS.sessionProfile, formData)
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

export const changePassword = (formData: any) => {
  return httpRequest().post(API_URLS.changePassword, formData)
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

export const verifyUserEmail = (formData: any) => {
  return openHttpRequest().post(API_URLS.verifyUserEmail, formData)
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

export const requestUserEmailVerificationCode = (formData: any) => {
  return openHttpRequest().post(API_URLS.emailVerificationCode, formData)
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

export const forgotPassword = (formData: any) => {
  return openHttpRequest().post(API_URLS.forgotPassword, formData)
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

// Reset user password
export const resetPassword = (formData: object) => {
  return openHttpRequest().post(API_URLS.resetPassword, formData)
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


export default {
  login, logout, fetchSessionData, changePassword, candidateSignUp, verifyUserEmail, requestUserEmailVerificationCode,
  forgotPassword, resetPassword
}
