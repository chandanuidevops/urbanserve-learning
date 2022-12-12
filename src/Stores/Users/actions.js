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
  OPEN_EDIT_MODAL

} from "./constants";

const actions = {
  getUsers: (payload) => {
    return { type: GET_USERS, payload };
  },
  getUsersSuccess: (payload) => {
    return { type: GET_USERS_SUCCESS, payload };
  },
  getUsersFailure: (payload) => {
    return { type: GET_USERS_FAILURE, payload };
  },
  openAddModal: (payload) => {
    return {
      type: OPEN_ADD_MODAL,
      payload,
    };
  },
  openEditModal:(payload)=>{
    return {
      type: OPEN_EDIT_MODAL,
      payload,
    };
  },
  closeAddModal: (payload) => {
    return {
      type: CLOSE_ADD_MODAL,
      payload,
    };
  },
  saveUser: (payload) => {
    return {
      type: USER_SAVE,
      payload,
    };
  },
  saveUserSuccess: (payload) => {
    return {
      type: USER_SAVE_SUCCESS,
      payload,
    };
  },
  saveUserFailure: (payload) => {
    return {
      type: USER_SAVE_FAILURE,
      payload,
    };
  },
  deleteUser:(payload)=>{
    return {
      type:USER_DELETE,
      payload
    }
  },
  deleteUserSuccess:(payload)=>{
    return {
      type:USER_DELETE_SUCCESS,
      payload
    }
  },
  deleteUserFailure:(payload)=>{
    return {
      type:USER_DELETE_FAILURE,
      payload
    }
  },
  openViewModal:(payload)=>{
    return{
      type:'',
      payload
    }
  }
};
export default actions;
