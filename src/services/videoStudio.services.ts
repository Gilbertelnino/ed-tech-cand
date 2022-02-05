import _ from "lodash";
import httpRequest from "../utils/httpRequest"
import API_URLS from "../../src/utils/apiUrls";

export const fetchVideoStudioList = () => {

  return httpRequest().get(`${API_URLS.videoStudio}/`).then(res => {
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

export const fetchVideoDetails = (id: any) => {

  return httpRequest().get(`${API_URLS.videoStudio}/${id}`).then(res => {
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

export const createVideo = (payload: any) => {

  const formData = payload.formData;
  const cancelToken = payload.cancelToken;
  const id = _.get(payload, "id", 0);
  let url = API_URLS.videoStudio;

  // Edit URL
  if (id) {
    url = `${API_URLS.videoStudio}/update/${id}`;
  }

  return httpRequest().post(url, formData, { cancelToken: cancelToken.token }).then(res => {
    return {
      flag: true,
      message: _.get(res, "message", ""),
      data: _.get(res, "data", {})
    };
  }).catch(err => {

    return {
      flag: false,
      message: err.response ? _.get(err, "response.data.message", "Something went wrong!") : "RESPONSE_EMPTY",
      errors: _.get(err, "response.data.errors", {})
    };
  });
}

export const updateVideo = (payload: any) => {

  return httpRequest().put(`${API_URLS.videoStudio}/update-meta/${payload.id}`, payload).then(res => {
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

export const deleteVideo = (videoId: any) => {

  return httpRequest().delete(`${API_URLS.videoStudio}/${videoId}`).then(res => {
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

export const setPrimaryVideo = (videoId: any) => {

  return httpRequest().put(`${API_URLS.videoStudio}/${videoId}/primary`).then(res => {
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

export const getClipVideoBlob = (payload: any) => {

  return httpRequest().get(`${API_URLS.videoStudio}/clip-blob/${payload.videoStudioId}/${payload.clipId}`, { responseType: 'blob' }).then(res => {
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

export default {
  fetchVideoStudioList, fetchVideoDetails, createVideo, updateVideo, deleteVideo, setPrimaryVideo, getClipVideoBlob
}

