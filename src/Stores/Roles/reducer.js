import produce from "immer";
import { GET_ROLES, GET_ROLES_SUCCESS, GET_ROLES_FAILURE } from "./constants";

const initialState = {
  isLoadingRoles: false,
  roles: [],
};
const RoleReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ROLES:
        draft.isLoadingRoles = true;
        draft.roles = [];
        break;
      case GET_ROLES_SUCCESS:
        draft.isLoadingRoles = false;
        draft.roles = action.payload;
        break;
      case GET_ROLES_FAILURE:
        draft.isLoadingRoles = false;
        draft.roles = [];
        break;

      default:
        return state;
    }
  });
};
export default RoleReducer
