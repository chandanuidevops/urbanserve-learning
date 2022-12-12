import {
  CHECK,
  CHECK_FAILURE,
  CHECK_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "./constants";

const actions = {
  login: (credentials, history) => {
    return {
      type: LOGIN,
      credentials,
      history,
    };
  },
  loginSuccess: (payload) => {
    return {
      type: LOGIN_SUCCESS,
      payload
    };
  },
  loginFailure: (payload) => {
    return {
      type: LOGIN_FAILURE,
      payload
    };
  },

  check: (token, history) => {
    return {
      type: CHECK,
      token,
      history,
    };
  },
  checkSuccess: (payload) => {
    return {
      type: CHECK_SUCCESS,
      payload,
    };
  },
  checkFailure: (error) => {
    return {
      type: CHECK_FAILURE,
      error,
    };
  },
  logout:(payload)=>{
    return{
      type:LOGOUT,
      payload
    }
  },
  logoutSuccess:(payload)=>{
    return{
      type:LOGOUT_SUCCESS,
      payload
    }
  },
  logoutFailure:(error)=>{
    return{
      type:LOGOUT_FAILURE,
      error
    }
  }
};
export default actions;
