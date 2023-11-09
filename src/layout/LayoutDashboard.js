import React from "react";
import DashboardRightSidebar from "modules/dashboard/DashboardRightSidebar";
import DashboardLeftSidebar from "modules/dashboard/DashboardLeftSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutDashboard = () => {
  return (
    <div className="flex justify-between h-screen text-white bg-dashboard-bg">
      <DashboardLeftSidebar></DashboardLeftSidebar>
      <div className="w-[75%]  rounded-md p-4 text-black ">
        <Outlet></Outlet>
      </div>
      <DashboardRightSidebar></DashboardRightSidebar>
    </div>
  );
};

export default LayoutDashboard;
