import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
