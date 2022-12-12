import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { StyledButton } from "../../StyledComponent";
import { Details } from "@mui/icons-material";
export const CancelButton = styled(StyledButton)(() => ({
  backgroundColor: "#fff",
  color: "#000",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));
export const DeleteButton = styled(StyledButton)(() => ({
  backgroundColor: "#D94430",
  color: "#fff",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#e06959",
  },
}));
function DeleteModal({ open, details, deleteMethod, onClose, isLoading }) {
  return (
    <Dialog open={open} onClose={onClose}>
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>{details.title}</DialogTitle>
      <DialogContent>{details.description}</DialogContent>
      <DialogActions>
        <DialogActions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton onClick={deleteMethod}>Delete</DeleteButton>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
