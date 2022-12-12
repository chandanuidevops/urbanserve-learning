import React from "react";
import { styled } from "@mui/material/styles";
import { StyledButton } from "../StyledComponent";
import { PropTypes } from 'prop-types';
export const CloseButton = styled(StyledButton)(() => ({
  backgroundColor: "#fff",
  color: "#000",
  margin: "0 1rem",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));
function CancelButton({closeModal}) {
  return (
    <>
      <CloseButton onClick={closeModal} >Cancel</CloseButton>
    </>
  );
}
CancelButton.propTypes={
    closeModal:PropTypes.func.isRequired
}
export default CancelButton;