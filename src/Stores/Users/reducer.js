import produce from "immer";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  OPEN_ADD_MODAL,
  CLOSE_ADD_MODAL,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAILURE,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  OPEN_EDIT_MODAL,
} from "./constants";
const initialState = {
  isLoadingUsers: false,
  users: {},
  isModalOpen: false,
  isUserSaving: false,
  user: {},
  isUserDeleting: false,
  deletedUser: {},
  currentUser: {},
};
const UserReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_USERS:
        draft.isLoadingUsers = true;
        draft.users = {};
        break;
      case GET_USERS_SUCCESS:
        draft.isLoadingUsers = false;
        draft.users = action.payload;
        break;
      case GET_USERS_FAILURE:
        draft.isLoadingUsers = false;
        break;
      case OPEN_ADD_MODAL:
        draft.isModalOpen = true;
        draft.currentUser = {};
        break;
      case OPEN_EDIT_MODAL:
        draft.isModalOpen = true;
        draft.currentUser = action.payload;
        break;
      case CLOSE_ADD_MODAL:
        draft.currentUser = {};
        draft.isModalOpen = false;
        break;
      case USER_SAVE:
        draft.isUserSaving = true;
        break;
      case USER_SAVE_SUCCESS:
        draft.isUserSaving = false;
        draft.user = action.payload;
        draft.isModalOpen = false;
        draft.currentUser = {};
        break;
      case USER_SAVE_FAILURE:
        draft.isUserSaving = false;
        break;
      case USER_DELETE:
        draft.isUserDeleting = true;
        draft.deletedUser = {};
        break;
      case USER_DELETE_SUCCESS:
        draft.isUserDeleting = false;
        draft.deletedUser = action.payload;
        break;
      case USER_DELETE_FAILURE:
        draft.isUserDeleting = false;
        draft.deletedUser = {};
        break;

      default:
        return state;
    }
  });
};
export default UserReducer;
