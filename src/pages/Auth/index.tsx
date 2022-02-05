import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import appRoutes from "../../routes/app.routes";
import { resetLoginFlag } from "../../reducers/auth/login.reducer";

const Auth = (props: any) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0); // SignUp = 0, Login = 1

  useEffect(() => {
    const pathName = _.get(props, "location.pathname", "");

    // Visible Login form is user has login route
    if (pathName === appRoutes.userLogin.path) {
      setValue(1);
    }

    // reset the store on unmounted
    return () => {
      dispatch(resetLoginFlag());
    };
  }, [dispatch, props]);

  return <div className="auth-wrapper">{value === 0 ? <SignUp /> : <Login />}</div>;
};

export default Auth;
