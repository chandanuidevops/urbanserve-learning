import React from "react";
import { Box ,Typography} from "@mui/material";
import Header from "./../Header/index";
function PageHeader({ pageTitle,actions }) {
  
  return (
    <div style={{ width: "100%" }}>
      <Header pageTitle={pageTitle}>
        <Box  display="flex"
        marginBottom="2rem"
        marginLeft="1rem"
        marginRight="1rem"
        marginTop="2rem"
        width="auto
        ">
          <Typography variant="h3" style={{flex:1}} >

          </Typography>
          {actions}
        </Box>
       
      </Header>
    </div>
  );
}

export default PageHeader;
