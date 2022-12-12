import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { removeSnackBar } from "../../Stores/Alerts/actions";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SuccessSnackBar = () => {
  const dispatch = useDispatch();
  const { successSnackBarOpen, successSnackBarMessage } = useSelector(
    (state) => state.AlertReducer
  );
  const handleClose = () => {
    dispatch(removeSnackBar("success"));
  };

  return (
    <Snackbar
      open={successSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {successSnackBarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
