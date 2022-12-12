import { GET_ROLES } from "./constants";
import { call, all, put, select, takeEvery } from "redux-saga/effects";
import { getRolesSuccess, getRolesFailure } from "./actions";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import { selectToken } from "../selectors";
export function* getRoles({ payload }) {
  const token = yield select(selectToken);
  try {
    const { data } = yield call(api(token).get, `/api/roles?all=true`);

    yield put(getRolesSuccess(data));
  } catch (error) {
    yield put(errorAlert(error.message));
    yield put(getRolesFailure());
  }
}
export function* watchGetRoles() {
  yield takeEvery(GET_ROLES, getRoles);
}
export default function* RolesSaga() {
  yield all([watchGetRoles()]);
}
