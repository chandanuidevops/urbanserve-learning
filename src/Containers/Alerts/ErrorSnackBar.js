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
  const { errorSnackBarOpen, errorSnackBarMessage } = useSelector(
    (state) => state.AlertReducer
  );

  const handleClose = () => {
    dispatch(removeSnackBar("error"));
  };

  return (
    <Snackbar
      open={errorSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorSnackBarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
