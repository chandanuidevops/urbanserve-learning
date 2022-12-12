import React from "react";

import { TableCell, TableRow, Skeleton } from "@mui/material";
function TableLoader({ numOfColums }) {
  return (
    <>
      {["1", "2", "3", "4"].map((ele) => (
        <TableRow key={ele}>
          <TableCell colSpan={numOfColums} scope="row">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default TableLoader;
