import produce from "immer";
import {
  SUCCESS_SNACKBAR,
  ERROR_SNACKBAR,
  WARNING_SNACKBAR,
  CLEAR_SNACKBAR,
} from "./constants";

export const initialState = {
  successSnackBarOpen: false,
  errorSnackBarOpen: false,
  successSnackBarMessage: null,
  errorSnackBarMessage: null,
};
const AlertReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_SNACKBAR:
        draft.successSnackBarOpen = true;
        draft.successSnackBarMessage = action.payload;
        break;
      case ERROR_SNACKBAR:
        draft.errorSnackBarOpen = true;
        draft.errorSnackBarMessage = action.payload;

        break;
      case CLEAR_SNACKBAR:
        if (action.payload === "success") {
          draft.successSnackBarOpen = false;
          draft.successSnackBarMessage = null;
        }
        if (action.payload === "error") {
          draft.errorSnackBarOpen = false;
          draft.errorSnackBarMessage = null;
        }
        break;
      default:
        break;
    }
  });
export default AlertReducer;
