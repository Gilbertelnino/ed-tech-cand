import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get, omit };

export const getAdmin = async (payload: any) => {
  const queryString = await objectToParams(payload);
  return httpRequest().get(`${API_URLS.companies}/admins?${queryString}`)
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

export const getAllAdmins = async () => {
  return httpRequest().get(`${API_URLS.companies}/admins/all`)
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

export const getAdminDetail = (id: number) => {
  return httpRequest().get(`${API_URLS.companies}/admin/${id}`)
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

export const getAdminHistory = (id: number) => {
  return httpRequest().get(`${API_URLS.companies}/admin-audit-logs/${id}`)
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

export const createAdmin = (formData: any) => {
  return httpRequest().post(`${API_URLS.companies}/invite-admin`, formData)
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

export const deleteAdmin = (id: any) => {
  return httpRequest().delete(`${API_URLS.companies}/remove-admin/${id}`)
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

export const searchCompanies = async (payload: any) => {

  return httpRequest().get(`${API_URLS.companies}/search/${payload}`)
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

export const inviteAdmin = (id: number) => {
  return httpRequest().post(`${API_URLS.companies}/invite-admin/${id}`)
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

export const reInviteAdmin = (id: number) => {
  return httpRequest().post(`${API_URLS.companies}/resend-admin-invite`, {id: id})
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

export const inviteAdminByMail = (payload: any) => {
  return httpRequest().post(`${API_URLS.companies}/invite-admin-by-mail`, payload)
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
  getAdmin,
  inviteAdmin,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  reInviteAdmin,
  getAdminDetail,
  getAdminHistory,
  searchCompanies,
  inviteAdminByMail
}
