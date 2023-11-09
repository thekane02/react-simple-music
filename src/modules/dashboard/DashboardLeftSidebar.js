import React from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  IconTrack,
  IconPlaylist,
  IconAlbum,
  IconUser,
  IconArrowToggle,
  IconDashboard,
} from "components/icons";
import { useSelector } from "react-redux";

const itemClass =
  "flex items-center justify-between w-full px-4 py-2 text-lg font-semibold cursor-pointer rounded-md";
const subItemClass =
  "flex items-center gap-3 px-2 py-[4px] mx-10 text-base font-semibold rounded-sm";
let sidebarLink = null;
const adminSidebarLink = [
  {
    icon: <IconDashboard></IconDashboard>,
    title: "Dashboard",
    url: "/",
  },
  {
    icon: <IconUser></IconUser>,
    title: "Accounts",
    subs: [
      {
        color: "text-pink-300",
        bg: "bg-pink-300",
        title: "Admins",
        url: "admins",
      },
      {
        color: "text-orange-300",
        bg: "bg-orange-300",
        title: "Artists",
        url: "/artists",
      },
      {
        color: "text-blue-300",
        bg: "bg-blue-300",
        title: "Users",
        url: "/Users",
      },
    ],
  },
  {
    icon: <IconTrack></IconTrack>,
    title: "Tracks",
    url: "/tracks",
  },
  {
    icon: <IconPlaylist></IconPlaylist>,
    title: "Playlists",
    url: "/playlists",
  },
  {
    icon: <IconAlbum></IconAlbum>,
    title: "Albums",
    url: "/albums",
  },
];
const artistSidebarLink = [
  {
    icon: <IconDashboard></IconDashboard>,
    title: "Dashboard",
    url: "/",
  },
  {
    icon: <IconTrack></IconTrack>,
    title: "Tracks",
    url: "/tracks",
  },
  {
    icon: <IconAlbum></IconAlbum>,
    title: "Albums",
    url: "/albums",
  },
];
const DashboardLeftSidebar = () => {
  const user = useSelector((state) => state.auth.login);
  user.role === "Admin"
    ? (sidebarLink = [...adminSidebarLink])
    : (sidebarLink = [...artistSidebarLink]);
  return (
    <div className="w-[15%] px-8 py-12 bg-bg-color">
      <Link
        to="/"
        className="inline-block w-full text-4xl font-semibold text-center uppercase font-secondary"
      >
        {`${user.role} Manager`}
      </Link>
      <div className="my-10">
        {sidebarLink.map((link) =>
          !link.subs ? (
            <NavLink
              to={link.url}
              // className={`flex items-center justify-between w-full px-4 py-2 text-lg font-semibold cursor-pointer ${({
              //   isActive,
              // }) => (isActive ? "bg-slate-400" : "")}`}
              className={({ isActive }) =>
                isActive
                  ? `${itemClass} bg-[rgba(255,255,255,0.2)]`
                  : `${itemClass}`
              }
              key={link.title}
            >
              <div className="flex gap-2">
                <span className="w-[28px]">{link.icon}</span>
                {link.title}
              </div>
            </NavLink>
          ) : (
            <div key={uuidv4()}>
              <div className={itemClass}>
                <div className="flex gap-2">
                  <span className="w-[28px]">{link.icon}</span>
                  {link.title}
                </div>
                <span className="w-[24px]">
                  <IconArrowToggle></IconArrowToggle>
                </span>
              </div>
              <div className="flex flex-col">
                {link.subs.map((sub) => (
                  <NavLink
                    key={uuidv4()}
                    className={({ isActive }) =>
                      isActive
                        ? `${subItemClass} font-bold ${sub.color}`
                        : `${subItemClass}`
                    }
                    to={sub.url}
                  >
                    <span
                      className={`block w-[14px] h-[14px] ${sub.bg} rounded-sm`}
                    ></span>
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardLeftSidebar;
