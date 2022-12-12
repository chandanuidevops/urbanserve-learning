import React from "react";
import { IconButton, Divider, Box } from "@mui/material";
import { ReactComponent as EyeIcon } from "../../Assets/Images/view.svg";
import { ReactComponent as EditIcon } from "../../Assets/Images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../Assets/Images/delete.svg";
import { styled } from "@mui/material/styles";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": { background: "transparent" },
  padding: "0px 15px",
}));
function TableCellActions({
  viewMethod,
  canView,
  canEdit,
  editMethod,
  canDelete,
  deleteMethod,
}) {
  return (
    <Box display="flex">
      {canView && (
        <StyledIconButton onClick={viewMethod}>
          <EyeIcon  />
        </StyledIconButton>
      )}
      {(canEdit || canDelete) && (
        <Divider orientation="vertical" variant="middle" flexItem />
      )}
      {canEdit && (
        <StyledIconButton onClick={editMethod}>
          <EditIcon  />
        </StyledIconButton>
      )}
      {canDelete && (
        <Divider orientation="vertical" variant="middle" flexItem />
      )}
      {canDelete && (
        <IconButton onClick={deleteMethod} >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default TableCellActions;
