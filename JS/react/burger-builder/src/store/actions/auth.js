import * as actionTypes from './actionTypes';
import axios from "axios";
import config from '../../info'

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: data.idToken,
    userId: data.localId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationDate * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
    if (isSignUp) {
      url += 'signupNewUser?key=';
    } else {
      url += 'verifyPassword?key=';
    }
    axios.post(
      url + config.apiKey,
      authData
    ).then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('expirationDate', expirationDate.toString());

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);

      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    }).catch((error) => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    })
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  }
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut());
      return;
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logOut());
      return;
    }

    dispatch(authSuccess({
      idToken: token,
      localId: localStorage.getItem('userId'),
    }));

    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  };
};
