import React, { useState } from "react";
import { ModalCloseButton } from "../StyledComponent";
import { Dialog, DialogActions, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { StyledButton } from "../StyledComponent";
export const CloseButton = styled(StyledButton)(() => ({
  backgroundColor: "#fff",
  color: "#000",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));

function CancelIconModal({ onCloses }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalCloseButton onClick={() => setOpen(true)}>
        <CloseIcon />
      </ModalCloseButton>
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

export default CancelIconModal;
