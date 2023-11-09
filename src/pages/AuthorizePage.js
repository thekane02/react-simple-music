import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authLogin } from "store/auth/auth-slice";

const AuthorizePage = () => {
  const [param] = useSearchParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      authLogin(`${param.get("code")}${process.env.REACT_APP_SECRET_KEY}`)
    );
  }, []);
  useEffect(() => {
    if (user && user.email) navigate("/");
  }, [navigate, user]);
  // if (user && user.email) return null;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="block w-20 h-20 rounded-full border-[6px] animate-spin border-secondary border-t-transparent"></span>
    </div>
  );
};

export default AuthorizePage;
