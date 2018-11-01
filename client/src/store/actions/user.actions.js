import { userConstants } from "../constants/constants";
import { userService } from "../services/services";
import { alertActions } from "./alerts.actions";

export const userActions = {
  signup,
  login,
  logout
};

const signup = (username, password, defaultLanguages) => {
  const request = user => {
    return { type: userConstants.SIGNUP_REQUEST, user };
  };
  const success = user => {
    return { type: userConstants.SIGNUP_SUCCESS, user };
  };
  const failure = error => {
    return { type: userConstants.SIGNUP_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ username }));

    userService.signup(username, password, defaultLanguages).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
};

const login = (username, password) => {
  const request = user => {
    return { type: userConstants.LOGIN_REQUEST, user };
  };
  const success = user => {
    return { type: userConstants.LOGIN_SUCCESS, user };
  };
  const failure = error => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
};

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};
