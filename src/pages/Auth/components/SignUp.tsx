import { FormHelperText, InputAdornment, Radio } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Checkbox, Input } from "../../../components/common";
import { rootReducersState } from "../../../reducers";
import { userSignUpRequest, userSignUpReset } from "../../../reducers/auth/signUp.reducer";
import appRoutes from "../../../routes/app.routes";
import { ReactComponent as PersonIcon } from "../../../assets/svg/person.svg";
import { ReactComponent as EnvelopeIcon } from "../../../assets/svg/envelope.svg";
import { ReactComponent as LockIcon } from "../../../assets/svg/lock.svg";
import FacebookIcon from "../../../assets/images/facebook.png";
import GoogleIcon from "../../../assets/images/google.png";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
  termsAndConditions: boolean;
};

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSignUpReducer = useSelector(({ auth }: rootReducersState) => auth.signUp);
  const [agreeTC, setAgreeTC] = useState(false);
  const loading = _.get(userSignUpReducer, "loading", false);
  const emailToken = _.get(userSignUpReducer, "token", "");
  const signUpFlag = _.get(userSignUpReducer, "flag", false);
  const signUpErrors = _.get(userSignUpReducer, "errors", {});
  const signUpState = _.get(userSignUpReducer, "signUpActiveForm", "candidate");

  const { register, handleSubmit, errors, watch, setError, reset } = useForm<Inputs>();

  // Watch the field for verify process
  const password = useRef({});
  password.current = watch("password", "");
  const email = useRef({});
  email.current = watch("email", "");

  // Sign up error Hook
  useEffect(() => {
    _.forEach(signUpErrors, (value, key: any) => {
      setError(key, { type: "manual", message: value });
    });
  }, [signUpErrors, setError]);

  // Sign up success Hook
  useEffect(() => {
    if (signUpFlag === true) {
      reset();
      dispatch(userSignUpReset());
      history.push(appRoutes.userVerify.generatePath(emailToken));
    }
  }, [signUpFlag, dispatch, history, emailToken, reset]);

  const onSubmit = (formData) => {
    let payload = {
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      email: formData.email || "",
      password: formData.password || "",
      confirm_password: formData.confirm_password || "",
      gender: formData.gender || "",
      signUpState,
    };

    if ((formData.gender || "") === "custom") {
      payload["gender_pronoun"] = _.get(formData, "gender_pronoun.value", 0);
      payload["gender_optional"] = formData.gender_optional || "";
    }

    // Append company data
    if (signUpState === "employer") {
      payload["company_name"] = (formData.company_name || {}).value;
      payload["employee_id"] = formData.employee_id;
    }

    dispatch(userSignUpRequest(payload));
  };

  const _handleChangeTC = (e: any) => {
    const { currentTarget } = e;
    setAgreeTC(currentTarget.checked || false);
  };

  return (
    <>
      <div className="auth-card auth-signup-wrapper">
        <h2 className="auth-card-title">Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <p className="form-group-label">Full Name</p>
            <div className="inline-inputs">
              <Input
                name="first_name"
                placeholder="First Name"
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
                    message: "Please enter first name",
                  },
                })}
              />
              <Input
                name="last_name"
                placeholder="Last Name"
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
                    message: "Please enter last name",
                  },
                })}
              />
            </div>
          </div>
          <div className="form-group">
            <p className="form-group-label">Email Address</p>
            <div className="inline-inputs">
              <Input
                name="email"
                placeholder="Email"
                validationObj={errors}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EnvelopeIcon />
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
              <Input
                name="verify_email"
                placeholder="Re-enter Email"
                validationObj={errors}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EnvelopeIcon />
                    </InputAdornment>
                  ),
                }}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please enter verify email address",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter valid verify email address",
                  },
                  validate: (value) => value === email.current || "The verify email do not match",
                })}
              />
            </div>
          </div>
          <div className="form-group">
            <p className="form-group-label">Password</p>
            <div className="inline-inputs">
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
              <Input
                type="password"
                name="confirm_password"
                placeholder="Re-enter Password"
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
                    message: "Please enter  password",
                  },
                  validate: (value) => value === password.current || "The re-entered do not match",
                })}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inline-inputs check">
              <Radio
                id="privacyAgreement"
                checked={agreeTC}
                onChange={_handleChangeTC}
                name="termsAndConditions"
                color="primary"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please agree to employHER's terms and conditions.",
                  },
                })}
              />
              <label htmlFor="privacyAgreement" className="privacy-agreement">
                By Signing up, I agree to employ<span>HER</span>’s{" "}
                <a rel="noreferrer" target="_blank" href={appRoutes.termsOfService.generatePath()}>
                  Terms of Service
                </a>
                .
              </label>
              {errors.termsAndConditions && <FormHelperText className="text-danger">{errors.termsAndConditions.message}</FormHelperText>}
            </div>
          </div>
          <div className="form-group btn-group">
            <Button type="submit" className="primary-btn" loading={loading}>
              Create account
            </Button>
          </div>
        </form>
        <div className="social-login-wrapper">
          <div className="label-wrapper">
            <p>Or sign up with</p>
          </div>
          <div className="icons">
            <div>
              <img src={GoogleIcon} alt="social-icon-google" />
            </div>
            <div>
              <img src={FacebookIcon} alt="social-icon-google" />
            </div>
          </div>
        </div>
      </div>
      <p className="outer-link sign-up-outer-link">
        Already have an account? <Link to={appRoutes.userLogin.path}>Sign in</Link>
      </p>
    </>
  );
};

export default SignUp;
