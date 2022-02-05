import React from 'react';
import { get } from 'lodash';
import { Redirect, Route, useHistory } from "react-router-dom";
import { getDefaultRoute, verifyToken } from '../utils/appUser'
import appRoutes from './app.routes';
import { useSelector } from 'react-redux';
import { rootReducersState } from '../reducers';

const _ = { get };

const RoutesContainer = ({ component: Component, layout: Layout, ...rest }: any) => {
  const history = useHistory();

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const loggedUser = _.get(sessionReducer, "currentUser", {});
  const defaultRoute = getDefaultRoute();
  const token = _.get(sessionReducer, "token", null);

  const isPrivateRoute: boolean = _.get(rest, "private", false);
  const isLoggedIn: Boolean = token ? true : false;
  const accessLevel: string = _.get(rest, "access.level", "");

  const role = _.get(loggedUser, "role", "");

  // Do not allow each other users to access routes.
  if (isPrivateRoute && isLoggedIn) {

    // If current user has not access of route (company !== candidate)
    // Access Forbidden
    if (role !== accessLevel) {
      return (<Redirect to={defaultRoute} />)
    }
  }


  return (
    <Route
      {...rest}
      render={props => {
        if (isPrivateRoute === true) {
          if (token) {
            // Redirect User to the relevant pages
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            )
          } else {
            // redirect to login
            history.push(appRoutes.userLogin.path);
          }
        } else {
          // Check if user is already logged in
          if (token && [appRoutes.userLogin.path, appRoutes.userSignUp.path].includes(history.location.pathname)) {
            return (<Redirect to="/" />)
          } else {
            return (
              <Layout>
                <Component {...props} isPublic={true} />
              </Layout>
            )
          }
        }
      }
      }
    />
  )
}

export default RoutesContainer;
