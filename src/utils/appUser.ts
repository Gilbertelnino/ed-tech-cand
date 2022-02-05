import { isEmpty, get } from "lodash";
import appRoutes from '../routes/app.routes';
import store from '../store';

const jwt = require('jsonwebtoken');
const _ = { isEmpty, get };

/**
 * Set user access token
 * @param token JWT string
 */
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

/**
 * Remove user token from local storage
 *
 */
export const removeToken = () => {
  localStorage.removeItem('token');
}

/**
 * Verify the User token
 * @param String token
 */
export const verifyToken = (token: string) => {

  try {
    const tokenData = jwt.decode(token);

    // Check if has valid key
    if (!_.isEmpty(tokenData) && (typeof tokenData === "object")) {
      return { valid: true, message: 'Valid token' };
    } else {
      return { valid: false, message: 'Invalid token' };
    }

  } catch (error) {
    return { valid: false, message: 'Invalid token' };
  }

}

/**
 * Get the token user details
 * @param token Pass the token if needs to be verify explicitly
 */
export const getTokenUser = (token: string | null = '') => {

  // Set the token from localStorage
  if (!token) {
    token = localStorage.getItem('token');
  }

  const userData = jwt.decode(token);

  // Check if has valid key
  if (!_.isEmpty(userData)) {
    return userData;
  } else {
    return {};
  }

}

/**
 * Verify reset password link
 *
 * @param String token
 * @return TRUE if valid, FALSE otherwise
 */
export const verifyResetPasswordLink = (token: string) => {

  try {
    const now = Date.now().valueOf() / 1000
    const tokenData = jwt.decode(token);

    if (typeof tokenData.exp !== 'undefined' && tokenData.exp > now) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
  }
  return false;
}

/**
 * Get Default route based on logged in user
 *
 */
export const getDefaultRoute = () => {

  const storeData = store.getState();
  const role = _.get(storeData, "session.currentUser.role", null);

  if (role === "company") {
    return appRoutes.companyDashboard.path;
  } else if (role === "candidate") {
    return appRoutes.candidateProfileView.path;
  } else {
    return appRoutes.home.path;
  }
}
