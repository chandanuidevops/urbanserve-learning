import { call, all, put, select, takeEvery } from "redux-saga/effects";
import { GET_USERS, USER_SAVE, USER_DELETE } from "./constants";
import actions from "./actions";
import { selectToken } from "../selectors";
import api from "../../utils/api";
import { successAlert, errorAlert } from "../Alerts/actions";
const {
  getUsersSuccess,
  getUsersFailure,
  saveUserSuccess,
  saveUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  getUsers: getAllUsers,
} = actions;

export function* getUsers({ payload }) {
  const token = yield select(selectToken);
  try {
    const { data } = yield call(api(token, null, true).get, "/api/users");

    yield put(getUsersSuccess(data));
  } catch (e) {
    yield put(errorAlert(e.message));
    yield put(getUsersFailure());
  }
}
export function* saveUser({ payload }) {
  const token = yield select(selectToken);

  try {
    const { data } = yield call(
      api(token, null, true).post,
      `/api/users/${
        payload.formData.id ? "edit/" + payload.formData.id : "add"
      }`,
      payload.formData
    );
    yield put(saveUserSuccess(data));
    yield put(getAllUsers());
    yield put(
      successAlert(
        `User ${payload.formData.id ? "updated" : "added"} successfully!`
      )
    );
  } catch (e) {
    yield put(errorAlert(e));
    yield put(saveUserFailure());
  }
}
export function* deleteUser({ payload }) {
  const token = yield select(selectToken);
  try {
    const response = yield call(
      api(token, null, true).delete,
      `/api/users/${payload}`
    );
    yield put(deleteUserSuccess(response));
    yield put(successAlert(response.message));
    yield put(getAllUsers());
  } catch (e) {
    yield put(errorAlert(e));
    yield put(deleteUserFailure());
  }
}

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}
export function* watchSaveUsers() {
  yield takeEvery(USER_SAVE, saveUser);
}
export function* watchDeleteUsers() {
  yield takeEvery(USER_DELETE, deleteUser);
}

export default function* UserSaga() {
  yield all([watchGetUsers(), watchSaveUsers(), watchDeleteUsers()]);
}
