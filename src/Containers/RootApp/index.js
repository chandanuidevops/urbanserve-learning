import React, { useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";

import actions from "../../Stores/Auth/actions";
import Alerts from "../Alerts";
import Login from "../Login";
import Dashboard from "../Dashboard";
import Orders from "../Orders";
import Loader from "../../Components/Loader";
import PrivateRoute from "../../Components/PrivateRoute";
import { PropTypes } from "prop-types";
import { Routes, Route, Link } from "react-router-dom";
import Users from './../Users/index';
const { check } = actions;
function RootApp({ isAuthenticating, checkAuth, isLoggingIn }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token);
    }
  }, []);

  return (
    <>
      <Alerts />
      <Suspense fallback={<h1>loading </h1>}>
        <Loader open={isAuthenticating || isLoggingIn} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/d" element={<Dashboard />}>
              <Route path='/d/orders' element={<Orders />} />
              <Route path='/d/users' element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
RootApp.propTypes = {
  isAuthenticating: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
};
const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticating: AuthReducer.isAuthenticating,
  isLoggingIn: AuthReducer.isLoggingIn,
});
const mapDispatchToProps = (dispatch) => ({
  checkAuth: (...params) => dispatch(check(...params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RootApp);
