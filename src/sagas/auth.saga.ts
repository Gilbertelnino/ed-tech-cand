import { put, takeLatest } from 'redux-saga/effects';
import { call } from "typed-redux-saga";
import _ from "lodash";
import { userLoginRequest, userLoginSuccess, userLoginFailed, resetLoginFlag } from '../reducers/auth/login.reducer';
import { userSignUpRequest, userSignUpSuccess, userSignUpFailed } from '../reducers/auth/signUp.reducer';
import { verifyUserEmailRequest, verifyUserEmailSuccess, verifyUserEmailFailed } from '../reducers/auth/verifyUserEmail.reducer';
import { requestVerifyUserEmailRequest, requestVerifyUserEmailSuccess, requestVerifyUserEmailFailed } from '../reducers/auth/requestUserEmailVerification.reducer';
import { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed } from '../reducers/auth/forgotPassword.reducer';
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed } from '../reducers/auth/resetPassword.reducer';
import authServices from '../services/auth.services';
import { verifyToken } from '../utils/appUser';
import history from '../utils/history';
import appRoutes from '../routes/app.routes';
import { fetchSessionDataRequest, sessionOutRequest, sessionOut, setSessionUserRequest } from '../reducers/auth/session.reducer';

interface payloadInterface {
  type: String
  payload: Object
}

// Login User
function* loginUserWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.login, payload);

  try {
    if (response.flag === true) {

      const token = _.get(response, "data.token", "");
      const emailVerified = _.get(response, "data.emailVerified", null);

      if (emailVerified !== false) {

        // verify token and store it
        const validToken = verifyToken(token);

        if (validToken.valid) {
          yield put(userLoginSuccess({
            message: response.message,
            data: _.get(response, "data", {})
          }));
        } else {
          yield put(userLoginFailed({
            message: (response.message || "Invalid Email or password"),
            errors: _.get(response, "errors", {})
          }));
        }
      } else {

        // Navigate user to email verification page
        if ((emailVerified === false) && token) {
          const redirectTo = appRoutes.userVerify.generatePath(token)
          history.push(redirectTo);
          yield put(resetLoginFlag());
        } else {
          yield put(userLoginFailed({
            message: (response.message || "Invalid Email or password"),
            errors: _.get(response, "errors", {})
          }));
        }
      }

    } else {
      yield put(userLoginFailed({ message: response.message }));
    }
  } catch (error: any) {
    yield put(userLoginFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* loginUserWatcher() {
  yield takeLatest(userLoginRequest.type, loginUserWorker);
}

// Login User
function* logoutUserWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.logout, payload);

  try {
    yield put(sessionOut());
  } catch (error: any) {
    yield put(sessionOut());
  }
}

export function* logoutUserWatcher() {
  yield takeLatest(sessionOutRequest.type, logoutUserWorker);
}


// Candidate SignUp
function* candidateSignUpWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.candidateSignUp, payload);

  try {
    if (response.flag === true) {
      yield put(userSignUpSuccess({
        message: response.message,
        token: _.get(response, "data.token", "")
      }));
    } else {
      yield put(userSignUpFailed({
        message: (response.message || ""),
        errors: _.get(response, "errors", {})
      }));
    }
  } catch (error) {
    yield put(userSignUpFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* candidateSignUpWatcher() {
  yield takeLatest(userSignUpRequest.type, candidateSignUpWorker);
}

// Verify User Email address
function* requestEmailVerificationWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.requestUserEmailVerificationCode, payload);

  try {
    if (response.flag === true) {

      yield put(requestVerifyUserEmailSuccess({
        message: response.message
      }));
    } else {
      yield put(requestVerifyUserEmailFailed({
        message: (response.message || "Invalid token")
      }));
    }
  } catch (error) {
    yield put(requestVerifyUserEmailFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* requestEmailVerificationWatcher() {
  yield takeLatest(requestVerifyUserEmailRequest.type, requestEmailVerificationWorker);
}

// Verify User Email address
function* verifyUserEmailWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.verifyUserEmail, payload);

  try {
    if (response.flag === true) {

      // verify token and store it
      const token = _.get(response, "data.token", "");
      const validToken = verifyToken(token);

      if (validToken.valid) {
        yield put(verifyUserEmailSuccess({
          message: response.message,
          data: _.get(response, "data", {})
        }));
      } else {
        yield put(verifyUserEmailFailed({
          message: (response.message || "Invalid token")
        }));
      }

    } else {
      yield put(verifyUserEmailFailed({
        message: (response.message || "Invalid token")
      }));
    }
  } catch (error) {
    yield put(verifyUserEmailFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* verifyUserEmailWatcher() {
  yield takeLatest(verifyUserEmailRequest.type, verifyUserEmailWorker);
}

// Forgot password
function* forgotPasswordWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.forgotPassword, payload);

  try {
    if (response.flag === true) {
      yield put(forgotPasswordSuccess({ message: response.message }));
    } else {
      yield put(forgotPasswordFailed({
        message: (response.message || "Invalid token")
      }));
    }
  } catch (error) {
    yield put(forgotPasswordFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* forgotPasswordWatcher() {
  yield takeLatest(forgotPasswordRequest.type, forgotPasswordWorker);
}


// Reset password
function* resetPasswordWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.resetPassword, payload);

  try {
    if (response.flag === true) {
      yield put(resetPasswordSuccess({ message: response.message }));
    } else {
      yield put(resetPasswordFailed({
        message: (response.message || "Invalid token")
      }));
    }
  } catch (error) {
    yield put(resetPasswordFailed({ message: _.get(error, "message", "Something went wrong!") }));
  }
}

export function* resetPasswordWatcher() {
  yield takeLatest(resetPasswordRequest.type, resetPasswordWorker);
}

// Reset password
function* fetchSessionDataWorker({ payload }: payloadInterface) {

  // calling an API
  const response = yield* call(authServices.fetchSessionData, payload);

  try {
    if (response.flag === true) {
      yield put(setSessionUserRequest(_.get(response, "data", {})));
    } else {
      yield put(sessionOut());
    }
  } catch (error) {
    yield put(sessionOut());
  }
}

export function* fetchSessionDataWatcher() {
  yield takeLatest(fetchSessionDataRequest.type, fetchSessionDataWorker);
}

