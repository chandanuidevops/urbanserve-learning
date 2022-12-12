import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import { useNavigate } from 'react-router-dom';
import api from "../../utils/api";
import actions from "./actions";
import { selectToken } from "../selectors";
import { CHECK, LOGIN, LOGOUT } from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
const { checkSuccess, checkFailure, loginSuccess, loginFailure,logoutSuccess,logoutFailure, } = actions;

export function* checkAuth({ token, history }) {
  if (token) {
    try {
      const userInfo = yield call(api(token).post, "/api/auth/me");
      if (userInfo instanceof Error) throw userInfo;
      yield put(checkSuccess({ token, user: userInfo }));
    } catch (e) {
      yield put(checkFailure(e));
      localStorage.clear();
    }
  } else {
    yield put(takeLatest(checkFailure("Invalid Token")));
  }
}
export function* login({ credentials, history }) {
  try {
    const loginResponse = yield call(
      api(null, null, true).post,
      "/api/auth/login",
      credentials
    );
    const { access_token } = loginResponse.data.data;
    if (access_token) {
      const userInfoResponse = yield call(
        api(access_token, null, true).post,
        "/api/auth/me"
      );
      localStorage.setItem("token", access_token);
      yield put(
        loginSuccess({ token: access_token, user: userInfoResponse.data.data })
      );
    }
  } catch (e) {
    yield put(errorAlert(e.response.data.message));
    yield put(loginFailure(e));

    localStorage.clear();
  }
}
export function* logout({payload}) {
  try {
    const token = yield select(selectToken);
    yield call(api(token).post, "/api/auth/logout");
    localStorage.clear();
    const navigate=payload.navigate
    navigate('/',{ replace: true })
   
    
  } catch (error) {
      yield put(logoutFailure(error))
      localStorage.clear();
  }
}

export function* checkAuthFlow() {
  yield takeLatest(CHECK, checkAuth);
}
export function* loginFlow() {
  yield takeLatest(LOGIN, login);
}
export function* logoutFlow() {
  yield takeLatest(LOGOUT, logout);
}
export default function* AuthSagas() {
  yield all([checkAuthFlow(), loginFlow(), logoutFlow()]);
}
