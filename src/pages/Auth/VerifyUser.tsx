import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import _ from "lodash";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components/common";
import {
  verifyUserEmailRequest,
  resetVerifyUserEmail,
} from "../../reducers/auth/verifyUserEmail.reducer";
import {
  requestVerifyUserEmailRequest,
  resetRequestVerifyUserEmail,
} from "../../reducers/auth/requestUserEmailVerification.reducer";
import { FlashMessage, PageTitle } from "../../components/common";
import appRoutes from "../../routes/app.routes";
import { userRoles } from "../../utils/appConstants";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import QuoteOfTheDay from "../../components/common/QuoteOfTheDay";
import { rootReducersState } from "../../reducers";
import { setSessionTokenRequest, setSessionUserRequest } from "../../reducers/auth/session.reducer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

type Inputs = {
  verification_code: string;
};

const VerifyUser = (props: any) => {
  const classes = useStyles();
  const history = useHistory();

  const formClasses = useFormStyles();
  const dispatch = useDispatch();

  const verifyUserEmail = useSelector(({ auth }: rootReducersState) => auth.verifyUserEmail);
  const successMessage = _.get(verifyUserEmail, "successMessage", "");
  const errorMessage = _.get(verifyUserEmail, "errorMessage", "");
  const loadingFlag = _.get(verifyUserEmail, "loading", false);
  const verifyEmailFlag = _.get(verifyUserEmail, "flag", false);

  const requestUserEmailVerification = useSelector(({ auth }: rootReducersState) => auth.requestUserEmailVerification);
  const userEmailVerificationLoading = _.get(requestUserEmailVerification, "loading", false);
  const userEmailVerificationMessage = _.get(requestUserEmailVerification, "message", null);
  const userEmailVerificationFlag = _.get(requestUserEmailVerification, "flag", null);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenData = _.get(sessionReducer, "currentUser", {});

  const { register, handleSubmit, errors } = useForm<Inputs>();

  // Redirect user to home page is already logged in
  useEffect(() => {
    const userRole = _.get(tokenData, "role", "");
    // Navigate user based on role
    if (userRole) {
      navigateUser(userRole);
    }
  }, []);

  // Hook, once user email verification done successfully
  useEffect(() => {
    if (verifyEmailFlag === true) {
      const data = _.get(verifyUserEmail, "data", {});

      const token = _.get(data, "token", null);
      const sessionData = _.get(data, "session", {});
      const userRole = _.get(data, "session.role", "");

      // Navigate user based on role
      navigateUser(userRole);

      // Set session data
      FlashMessage(successMessage);
      dispatch(setSessionTokenRequest(token));
      dispatch(setSessionUserRequest(sessionData));
      dispatch(resetVerifyUserEmail());
    }
  }, [verifyEmailFlag]);

  // Hook, when user email verification code sent
  useEffect(() => {
    if (userEmailVerificationFlag !== null) {
      if (userEmailVerificationFlag === true) {
        FlashMessage(userEmailVerificationMessage);
      } else if (userEmailVerificationFlag === false) {
        FlashMessage(userEmailVerificationMessage, "error");
      }

      dispatch(resetRequestVerifyUserEmail());
    }
  }, [userEmailVerificationFlag]);

  const navigateUser = (userRole) => {
    if (userRole === userRoles.COMPANY_ROLE.title) {
      history.push(appRoutes.companyBasicInfo.path);
    } else if (userRole === userRoles.CANDIDATE_ROLE.title) {
      history.push(appRoutes.candidateProfileView.path);
    }
  }

  const onSubmit = (formData) => {
    const token = _.get(props, "match.params.token", "");
    const code = _.get(formData, "verification_code", "");

    dispatch(verifyUserEmailRequest({ token, code }));
  };

  const _handleResendVerification = () => {
    dispatch(resetVerifyUserEmail());
    const token = _.get(props, "match.params.token", "");

    dispatch(requestVerifyUserEmailRequest({ token }));
  };

  return (
    <>
      {PageTitle("Forgot Password")}
      <div className="session-container">
        <div className="main-container">
          <div className="inner-main-container">
            <div className="main-container">
              <div className="inner-main-container">
                <div className="toggle-container">
                  <div
                    className={`${classes.root} eh-tab form-container login-form-container`}
                  >
                    <form
                      className={`${formClasses.root} verify-form`}
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="verify-code-container">
                        <h2 className="form-title">
                          Email Verification
                        </h2>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <Input
                              name="verification_code"
                              externalLabel={{ label: "Verification code" }}
                              placeholder="Email Verification code"
                              validationObj={errors}
                              inputRef={register({
                                required: {
                                  value: true,
                                  message: "Please enter email verification code",
                                },
                                minLength: {
                                  value: 6,
                                  message: "Please enter valid verification code",
                                },
                              })}
                            />
                            <div className="row mt-0">
                              {userEmailVerificationLoading === true ? (
                                <span className="span-link">
                                  Requesting new code...
                                </span>
                              ) : (
                                <span
                                  className="span-link"
                                  onClick={() => _handleResendVerification()}
                                >
                                  Request new verification code
                                </span>
                              )}
                            </div>
                            {errorMessage && (
                              <span className="text-sm text-danger">
                                {errorMessage}
                              </span>
                            )}
                          </Grid>

                          <Grid item xs={12} className="text-center mt-10">
                            <div className="row text-center mt-10">
                              <Button
                                type="submit"
                                className="primary-btn"
                                loading={loadingFlag}
                              >
                                Verify Email
                              </Button>
                            </div>
                            <div className="d-block mt-10">
                              <Link
                                to={appRoutes.userLogin.path}
                                className="forgot-password"
                              >
                                {" "}
                                Back{" "}
                              </Link>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-container">
            <QuoteOfTheDay />
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;
