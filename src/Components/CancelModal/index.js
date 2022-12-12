import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { StyledButton } from "..//StyledComponent";
import { Dialog, DialogActions, Typography } from "@mui/material";
export const CloseButton = styled(StyledButton)(() => ({
  backgroundColor: "#fff",
  color: "#000",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));

export const CancelButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));
function CancelModal({ onCloses }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CancelButton onClick={() => setOpen(true)}>Cancel</CancelButton>
      <Dialog open={open}>
        <Typography gutterBottom style={{ padding: "20px" }}>
          Are you sure you want to leave, you will lose your data if you
          continue!
        </Typography>
        <DialogActions>
          <StyledButton
            onClick={() => {
              setOpen(false);
              onCloses();
            }}
          >
            Yes
          </StyledButton>
          <CloseButton onClick={() => setOpen(false)}>No</CloseButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CancelModal;
