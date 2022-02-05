import axios from 'axios';
import _ from "lodash";
import store from "../store";
import { sessionOut } from '../reducers/auth/session.reducer';

/**
* Export a default instance for requesting an APIs
*
* This instance includes auth Header
*/
export default () => {
  const storeData = store.getState();
  const token = _.get(storeData, "session.token", null);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_END_POINT,
    timeout: 60000, // 1 minute
    headers: { Authorization: token }
  });

  // Watch every response received from the server
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch(sessionOut());
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;

}


/**
* Export an Axios instance
*
* This instance does not include auth Header
* This will be used to call open APIs which does not accept Auth Header
*/
export const openHttpRequest = () => axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: 60000 // 1 minutes
});
