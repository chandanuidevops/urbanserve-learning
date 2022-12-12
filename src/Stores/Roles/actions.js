import { GET_ROLES, GET_ROLES_SUCCESS, GET_ROLES_FAILURE } from "./constants";
export function getRoles(payload) {
  return {
    type: GET_ROLES,
    payload,
  };
}
export function getRolesSuccess(payload) {
    return {
      type: GET_ROLES_SUCCESS,
      payload,
    };
  }
  export function getRolesFailure(payload) {
    return {
      type: GET_ROLES_FAILURE,
      payload,
    };
  }
