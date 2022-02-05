import { combineReducers } from 'redux';

import requestUserEmailVerificationReducer from './requestUserEmailVerification.reducer';
import resetPasswordReducer from './resetPassword.reducer';
import verifyUserEmailReducer from './verifyUserEmail.reducer';
import changePasswordReducer from './changePassword.reducer';
import forgotPasswordReducer from './forgotPassword.reducer';
import signUpReducer from './signUp.reducer';
import loginReducer from './login.reducer';

export default combineReducers({
  requestUserEmailVerification: requestUserEmailVerificationReducer,
  verifyUserEmail: verifyUserEmailReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  signUp: signUpReducer,
  login: loginReducer,
});
