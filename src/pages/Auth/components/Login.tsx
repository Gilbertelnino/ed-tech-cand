import { InputAdornment } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "../../../components/common";
import { userLoginRequest, resetLoginFlag } from "../../../reducers/auth/login.reducer";
import { setSessionTokenRequest, setSessionUserRequest } from "../../../reducers/auth/session.reducer";
import appRoutes from "../../../routes/app.routes";
import { ReactComponent as PersonIcon } from "../../../assets/svg/person.svg";
import { ReactComponent as LockIcon } from "../../../assets/svg/lock.svg";
import { userRoles } from "../../../utils/appConstants";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, message: loginError, flag: loginFlag, data } = useSelector(({ auth }: any) => auth.login);

  const { register, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (loginFlag === true) {
      const token = _.get(data, "token", null);
      const sessionData = _.get(data, "session", {});
      const userRole = _.get(data, "session.role", "");

      // Set session data
      dispatch(setSessionTokenRequest(token));
      dispatch(setSessionUserRequest(sessionData));

      // Navigate user based on role
      if (userRole === userRoles.COMPANY_ROLE.title) {
        history.push(appRoutes.companyDashboard.path);
      } else if (userRole === userRoles.CANDIDATE_ROLE.title) {
        history.push(appRoutes.candidateProfileView.path);
      }

      dispatch(resetLoginFlag());
    }
  }, [loginFlag, data, dispatch, history]);

  const onSubmit = (formData) => {
    dispatch(
      userLoginRequest({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <>
      <div className="auth-card auth-login-wrapper">
        <h2 className="auth-card-title">Login</h2>
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
          <div className="form-group">
            <p className="form-group-label">Password</p>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              validationObj={errors}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              inputRef={register({
                required: {
                  value: true,
                  message: "Please enter password",
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
            {loginError && <span className="text-sm text-danger error-helper">{loginError}</span>}
          </div>
          <div className="form-group btn-group">
            <Button type="submit" className="primary-btn" loading={loading}>
              Login
            </Button>
          </div>
          <div className="form-group text-center">
            <Link to={appRoutes.userForgotPassword.path}>{appRoutes.userForgotPassword.title}</Link>
          </div>
        </form>
      </div>
      <p className="outer-link">
        If you don’t have an account? <Link to={appRoutes.userSignUp.path}>{appRoutes.userSignUp.title}</Link>
      </p>
    </>
  );
};

export default Login;
