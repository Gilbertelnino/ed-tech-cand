import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/common";
import { resetPasswordRequest, resetPasswordState, resetPasswordMessages } from "../../reducers/auth/resetPassword.reducer";
import { FlashMessage } from "../../components/common";
import appRoutes from "../../routes/app.routes";
import { Link } from "react-router-dom";
import { MessageHelper } from "../../components/common";
import { verifyResetPasswordLink } from "../../utils/appUser";
import { Helmet } from "react-helmet";
import { rootReducersState } from "../../reducers";
import { InputAdornment } from "@material-ui/core";
import { ReactComponent as PersonIcon } from "../../assets/svg/person.svg";

const _ = { get };

type Inputs = {
  new_password: string;
  confirm_password: string;
};

const ResetPassword = (props: any) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [validToken, setValidToken] = useState(null);

  const resetPassword = useSelector(({ auth }: rootReducersState) => auth.resetPassword);
  const successMessage = _.get(resetPassword, "successMessage", "");
  const errorMessage = _.get(resetPassword, "errorMessage", "");
  const loadingFlag = _.get(resetPassword, "loading", false);
  const resetPasswordFlag = _.get(resetPassword, "flag", false);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenData = _.get(sessionReducer, "currentUser", {});

  const { register, handleSubmit, watch, errors, reset: resetForm } = useForm<Inputs>();

  const watchNewPassword = watch("new_password"); // Watch email change to reset the success or error message

  // Did mount effect
  useEffect(() => {
    // Check if user is already logged in
    const userRole = _.get(tokenData, "role", "");
    if (userRole) {
      history.push("/");
    }

    const token = _.get(props, "match.params.token", "");

    // Check if link is expired or not
    const isValidToken = verifyResetPasswordLink(token);
    setValidToken(isValidToken);

    // Did unmounted, reset the store
    return () => {
      dispatch(resetPasswordState());
    };
  }, []);

  // Clear the error or success message only if feasible
  useEffect(() => {
    if (errorMessage || successMessage) {
      dispatch(resetPasswordMessages());
    }
  }, [watchNewPassword]);

  // Hook, once user forgot password sent successfully
  useEffect(() => {
    if (resetPasswordFlag === true) {
      FlashMessage(successMessage);
      dispatch(resetPasswordState());
      resetForm();
      history.push(appRoutes.userLogin.path);
    }
  }, [resetPasswordFlag]);

  const onSubmit = (formData) => {
    const payload = {
      token: _.get(props, "match.params.token", ""),
      newPassword: _.get(formData, "new_password", ""),
      confirmPassword: _.get(formData, "confirm_password", ""),
    };

    dispatch(resetPasswordRequest(payload));
  };

  return (
    <>
      <Helmet>
        <title>employHER | Reset Password</title>
      </Helmet>
      <div className="auth-wrapper">
        <div className="auth-card auth-login-wrapper">
          <h2 className="auth-card-title">Reset Password</h2>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {validToken ? (
              <>
                <div className="form-group">
                  <Input
                    name="new_password"
                    type="password"
                    validationObj={errors}
                    externalLabel={{ label: "New password" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Please enter new password",
                      },
                      minLength: {
                        value: 4,
                        message: "Password must be between 4 to 16 characters",
                      },
                      maxLength: {
                        value: 16,
                        message: "Password must be between 4 to 16 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                        message: "Must content at least one upper case, lower case, digit, special character and no white space",
                      },
                    })}
                  />
                </div>
                <div className="form-group">
                  <Input
                    name="confirm_password"
                    type="password"
                    validationObj={errors}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    externalLabel={{ label: "Confirm password" }}
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Please enter confirm password",
                      },
                    })}
                  />
                </div>
                {errorMessage && <MessageHelper type="error" text={errorMessage} />}
                <div className="row text-center mt-10">
                  <Button type="submit" color="dark-pink" loading={loadingFlag}>
                    Reset Password
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-center">
                <span className={`text-sm text-danger`}>
                  The link is expired, please <Link to={appRoutes.userForgotPassword.path}>click here</Link> to request for new password
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
