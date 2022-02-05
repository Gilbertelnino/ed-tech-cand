import React, { useEffect } from "react";
import { get } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/common";
import { forgotPasswordRequest, resetForgotPassword, resetForgotPasswordMessages } from "../../reducers/auth/forgotPassword.reducer";
import { FlashMessage, MessageHelper } from "../../components/common";
import appRoutes from "../../routes/app.routes";
import { ReactComponent as PersonIcon } from "../../assets/svg/person.svg";
import { Helmet } from "react-helmet";
import { rootReducersState } from "../../reducers";
import { InputAdornment } from "@material-ui/core";

const _ = { get };

type Inputs = {
  email: string;
};

const ForgotPassword = (props: any) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const forgotPassword = useSelector(({ auth }: rootReducersState) => auth.forgotPassword);
  const successMessage = _.get(forgotPassword, "successMessage", "");
  const errorMessage = _.get(forgotPassword, "errorMessage", "");
  const loadingFlag = _.get(forgotPassword, "loading", false);
  const forgotPasswordFlag = _.get(forgotPassword, "flag", false);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenData = _.get(sessionReducer, "currentUser", {});

  const { register, handleSubmit, watch, errors } = useForm<Inputs>();

  const watchEmail = watch("email"); // Watch email change to reset the success or error message

  // Did mount effect
  useEffect(() => {
    // Check if user is already logged in
    const userRole = _.get(tokenData, "role", "");
    if (userRole) {
      history.push("/");
    }

    // Did unmounted, reset the store
    return () => {
      dispatch(resetForgotPassword());
    };
  }, []);

  // Clear the error or success message only if feasible
  useEffect(() => {
    if (errorMessage || successMessage) {
      dispatch(resetForgotPasswordMessages());
    }
  }, [watchEmail]);

  // Hook, once user forgot password sent successfully
  useEffect(() => {
    if (forgotPasswordFlag === true) {
      FlashMessage(successMessage);
      dispatch(resetForgotPassword());
      history.push(appRoutes.userLogin.path);
    }
  }, [forgotPasswordFlag]);

  const onSubmit = (formData) => {
    const email = _.get(formData, "email", "");
    dispatch(forgotPasswordRequest({ email }));
  };

  return (
    <>
      <Helmet>
        <title>employHER | Forgot Password</title>
      </Helmet>
      <div className="auth-wrapper">
        <div className="auth-card auth-login-wrapper">
          <h2 className="auth-card-title">Forgot Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <p className="form-group-label">Email</p>
              <Input
                name="email"
                placeholder="Email"
                validationObj={errors}
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
                    message: "Please enter email address",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter valid email address",
                  },
                })}
              />
            </div>
            <div className="form-group btn-group">
              {errorMessage && <MessageHelper type="error" text={errorMessage} />}
              <Button type="submit" className="primary-btn" loading={loadingFlag}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
