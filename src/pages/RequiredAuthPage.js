import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "utils/auth";

const RequiredAuthPage = ({ allowRoles = [] }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  const roles = user?.roles;
  const { refresh_token } = getToken();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return roles.find((p) => allowRoles?.includes(p)) || roles.length >= 1 ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  );
};

export default RequiredAuthPage;
