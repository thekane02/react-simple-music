import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { IconLogout } from "../../components/icons";

const SelectedRightSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-[240px] bg-primary flex flex-col items-center">
      <div>
        <span
          onClick={handleLogout}
          className="block p-2 bg-white rounded-full cursor-pointer shadow-[rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_2px_6px_2px]"
        >
          <IconLogout className="fill-black h-[26px] w-[26px]"></IconLogout>
        </span>
      </div>
    </div>
  );
};

export default SelectedRightSidebar;
