import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage2 = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);
  if (user && user.email) return null;
  return <div className="text-lg text-white">Login</div>;
};

export default LoginPage2;
