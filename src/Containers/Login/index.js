import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
} from "@mui/material";

import { connect } from "react-redux";
import {Navigate} from 'react-router-dom'
import PropTypes from "prop-types";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import logo from "../../Assets/Images/logo.png";
import actions from "../../Stores/Auth/actions";
const loginAction = actions.login;

function Login({ login ,isLoggingIn,isAuthenticated}) {
 
  const [show, setShow] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleClickShowPassword = () => {
    setShow(!show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <Container maxWidth="sm">
      {
        isAuthenticated && <Navigate to='/d/orders' />
      }
      <Paper elevation={2}>
        <Box p={2}>
          <div style={{ textAlign: "center" }}>
            <img src={logo} alt="logo" style={{ height: "66px" }} />
          </div>

          <form onSubmit={onSubmit}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="standard"
              autoFocus
              fullWidth
              onChange={onChange}
              value={credentials.email}
              InputProps={{
                endAdornment: <PersonOutlineIcon />,
              }}
            />
            <TextField
              type={show ? "text" : "password"}
              name="password"
              label="Password"
              variant="standard"
              fullWidth
              onChange={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "10px" }}
            >
              <Button type="submit" variant="outlined" color="primary">
                Login
              </Button>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

Login.prototype = {
  login: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = ({ AuthReducer }) => {
  return {
    isLoggingIn:AuthReducer.isLoggingIn,
    isAuthenticated:AuthReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (...args) => dispatch(loginAction(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
