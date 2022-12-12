import produce from "immer";
import {
  CHECK,
  CHECK_FAILURE,
  CHECK_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./constants";

export const initialState = {
  isLoggingIn: false,
  user: null,
  token: null,
  isAuthenticating: false,
  isAuthenticated: false,
  isLoggingOut: false,
};
const AuthReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.isLoggingIn = true;
        break;
      case LOGIN_SUCCESS:
        draft.isLoggingIn = false;
        draft.user = action.payload.user;
        draft.isAuthenticated = true;
        draft.token = action.payload.token;
        break;
      case LOGIN_FAILURE:
        draft.isLoggingIn = false;
        break;
      case CHECK:
        draft.isAuthenticating = true;
        break;
      case CHECK_SUCCESS:
        draft.isAuthenticating = false;
        draft.isAuthenticated = true;
        draft.token = action.payload.token
        break;
      case CHECK_FAILURE:
        return initialState;
      case LOGOUT:
        draft.isLoggingOut = true;
        break;
      case LOGOUT_SUCCESS:
        draft.isLoggingOut = false;
        break;
      case LOGOUT_FAILURE:
        draft.isLoggingOut = false;
        break;

      default:
        return state;
    }
  });

export default AuthReducer;
