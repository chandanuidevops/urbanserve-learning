import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Typography,
  Popover,
  Grow,
  Box,
  MenuList,
  MenuItem,
  Paper,
  Avatar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as NotificationBellIcon } from "../../Assets/Images/bell.svg";
import Badge from "@mui/material/Badge";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import actions from '../../Stores/Auth/actions';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { useNavigate } from 'react-router-dom';
const logoutActions = actions.logout
function Header({ pageTitle ,logout,...rest}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSignOutAction=()=>{
    logout({navigate})
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "#fff",
          paddingTop: "0.2rem",
          paddingBottom: "0.2rem",
          borderBottom: "2px solid #dee3e7",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "black",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            <IconButton style={{ marginRight: "1rem" }}>
              <KeyboardBackspaceIcon />
            </IconButton>
            {pageTitle}
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={4} color="primary">
                <NotificationBellIcon
                  style={{ width: "30px", height: "30px" }}
                />
              </Badge>
            </IconButton>
            <IconButton onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Grow style={{ transformOrigin: "0 0 0" }}>
            <Paper
              style={{width:'250px', opacity: 1, visibility: "unset", transform: "unset" }}
            >
              <MenuList>
                <Box
                  style={{ padding: "1rem", borderBottom: "1px solid #dee3e7" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar>A</Avatar>
                    <div style={{ marginLeft: '0.8rem' }}>
                      <span style={{ display: "block", fontSize: "1.8rem" }}>
                        Admin
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.8rem",
                          color: "blue",
                          cursor: "pointer",
                          marginTop: "0.3rem",
                        }}
                      >
                        Your Profiles
                      </span>
                    </div>
                  </div>
                </Box>
                <MenuItem  style={{ padding: '0.2rem 0.8rem' }}>Change Password</MenuItem>
                <MenuItem  onClick={  onSignOutAction} style={{ padding: '0.2rem 0.8rem' }}>Logout</MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        </Popover>
      </AppBar>
      {rest.children}
    </div>
  );
}

const mapDispatchToProps =(dispatch)=>{
  return{
    logout:(...args)=>dispatch(logoutActions(...args))
  }
}
const withConnect=connect(null,mapDispatchToProps);


export default compose(withConnect) (Header);
