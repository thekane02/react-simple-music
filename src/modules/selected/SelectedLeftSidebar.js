import React from "react";
import {
  IconAlbum,
  IconHome,
  IconLogout,
  IconPlaylist,
  IconUser,
} from "../../components/icons";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "store/auth/auth-slice";

const itemClass =
  "flex py-4 items-center w-full gap-2 text-lg font-semibold text-white menu__item justify-center";

const sidebarNavLinks = [
  {
    title: "Home",
    icon: <IconHome></IconHome>,
    url: "/",
  },
  // {
  //   title: "Albums",
  //   icon: <IconAlbum className="fill-white w-[24px] h-[24px]"></IconAlbum>,
  //   url: "/albums/64579d7eb680077a8e37169b",
  // },
  {
    title: "Subscribe",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none" fillRule="evenodd">
          <path
            fill="currentColor"
            d="M11 2a5 5 0 1 0 0 10a5 5 0 0 0 0-10Zm0 11c-2.395 0-4.575.694-6.178 1.671c-.8.49-1.484 1.065-1.978 1.69C2.358 16.977 2 17.713 2 18.5c0 .845.411 1.511 1.003 1.986c.56.45 1.299.748 2.084.956C6.665 21.859 8.771 22 11 22c.23 0 .46-.002.685-.005a1 1 0 0 0 .89-1.428A5.973 5.973 0 0 1 12 18c0-1.252.383-2.412 1.037-3.373a1 1 0 0 0-.72-1.557c-.43-.046-.87-.07-1.317-.07Zm10.708 3.068a1 1 0 0 0-1.414-1.414l-3.182 3.182l-1.414-1.414a1 1 0 0 0-1.414 1.414l2.05 2.05a1.1 1.1 0 0 0 1.556 0l3.818-3.818Z"
          ></path>
        </g>
      </svg>
    ),
    url: "/subscribe",
  },
  {
    title: "Playlist",
    icon: (
      <IconPlaylist className="fill-white w-[24px] h-[24px]"></IconPlaylist>
    ),
    url: "/playlists",
  },
  {
    title: "Song favorite",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m13.087 21.388l.542-.916c.42-.71.63-1.066.968-1.262c.338-.197.763-.204 1.613-.219c1.256-.021 2.043-.098 2.703-.372a5 5 0 0 0 2.706-2.706C22 14.995 22 13.83 22 11.5v-1c0-3.273 0-4.91-.737-6.112a5 5 0 0 0-1.65-1.651C18.41 2 16.773 2 13.5 2h-3c-3.273 0-4.91 0-6.112.737a5 5 0 0 0-1.651 1.65C2 5.59 2 7.228 2 10.5v1c0 2.33 0 3.495.38 4.413a5 5 0 0 0 2.707 2.706c.66.274 1.447.35 2.703.372c.85.015 1.275.022 1.613.219c.337.196.548.551.968 1.262l.542.916c.483.816 1.69.816 2.174 0ZM7.5 9.715c0 1.752 2.163 3.615 3.49 4.593c.454.335.681.502 1.01.502c.329 0 .556-.167 1.01-.502c1.327-.978 3.49-2.84 3.49-4.593c0-2.677-2.475-3.677-4.5-1.609c-2.025-2.068-4.5-1.068-4.5 1.609Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    url: "/songs-favorite",
  },
];

const sidebarPersionalLinks = [
  { title: "Profile", icon: <IconUser></IconUser>, url: "/profile" },
  { title: "Logout", icon: <IconLogout></IconLogout>, url: "/logout" },
];

const adminSidebar = [
  {
    title: "User Manager",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M2 5.5A2.5 2.5 0 0 1 4.5 3h2.482c.464 0 .91.184 1.238.513l1.28 1.28l-2.06 2.06A.5.5 0 0 1 7.085 7H2V5.5ZM2 8v6.5A2.5 2.5 0 0 0 4.5 17h4.506a2.312 2.312 0 0 1 1.69-2.422a2.75 2.75 0 1 1 4.545-2.996A2.245 2.245 0 0 1 18 11.379V7.5A2.5 2.5 0 0 0 15.5 5h-4.793l-2.56 2.56A1.5 1.5 0 0 1 7.085 8H2Zm12.5 4.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0Zm1.5 4.063c0 1.09-.857 2.187-3 2.187s-3-1.094-3-2.188c0-.724.576-1.312 1.286-1.312h3.428c.71 0 1.286.588 1.286 1.313Zm.477 1.687h.023c1.786 0 2.5-.941 2.5-1.875c0-.621-.48-1.125-1.071-1.125h-1.333c.256.375.404.829.404 1.313c0 .582-.166 1.173-.523 1.687ZM18 13.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0Z"
        />
      </svg>
    ),
    url: "/manage/user",
  },
  {
    title: "Albums Manager",
    icon: <IconAlbum></IconAlbum>,
    url: "/manage/album",
  },
  {
    title: "Track Manager",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M10.147 2.022A.5.5 0 0 0 9.5 2.5v9.905a3.25 3.25 0 1 0 .995 2.165a.508.508 0 0 0 .005-.07V7.177l5.853 1.8A.5.5 0 0 0 17 8.5V5.977a2.5 2.5 0 0 0-1.765-2.39l-5.088-1.565Z"
        />
      </svg>
    ),
    url: "/manage/tracks",
  },
  {
    title: "Playlist Manager",
    icon: (
      <IconPlaylist className="fill-white w-[24px] h-[24px]"></IconPlaylist>
    ),
    url: "/manage/playlist",
  },
  {
    title: "Logger",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m22.69 18.37l1.14-1l-1-1.73l-1.45.49c-.32-.27-.68-.48-1.08-.63L20 14h-2l-.3 1.49c-.4.15-.76.36-1.08.63l-1.45-.49l-1 1.73l1.14 1c-.08.5-.08.76 0 1.26l-1.14 1l1 1.73l1.45-.49c.32.27.68.48 1.08.63L18 24h2l.3-1.49c.4-.15.76-.36 1.08-.63l1.45.49l1-1.73l-1.14-1c.08-.51.08-.77 0-1.27zM19 21c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zM11 7v5.41l2.36 2.36l1.04-1.79l-1.4-1.39V7h-2zm10 5a9 9 0 0 0-9-9C9.17 3 6.65 4.32 5 6.36V4H3v6h6V8H6.26A7.01 7.01 0 0 1 12 5c3.86 0 7 3.14 7 7h2zm-10.14 6.91c-2.99-.49-5.35-2.9-5.78-5.91H3.06c.5 4.5 4.31 8 8.94 8h.07l-1.21-2.09z"
        />
      </svg>
    ),
    url: "/logger",
  },
];

const SelectedLeftSidebar = () => {
  // const { roles } = useSelector((state) => state?.auth?.currentUser);
  return (
    <div className="fixed z-20 flex flex-col items-center gap-4 mt-4 left-14 top-header-height">
      <SidebarSession linkList={sidebarNavLinks}></SidebarSession>
      {/* {roles.find((role) => role === "admin") && (
        <SidebarSession linkList={adminSidebar}></SidebarSession>
      )} */}
      <SidebarSession linkList={sidebarPersionalLinks}></SidebarSession>
    </div>
  );
};

export default SelectedLeftSidebar;

const SidebarSession = ({ linkList = [] }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex-col items-center bg-dark-alt w-[60px] rounded-full py-2 hidden xl:flex">
      {linkList.map((link) => {
        if (link.url === "/logout")
          return (
            <button
              onClick={() => dispatch(authLogout())}
              className={itemClass}
              key={v4()}
            >
              <span className="">{link.icon}</span>
              {/* {link.title} */}
            </button>
          );
        return (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${itemClass} menu__item--active`
                : `${itemClass} group`
            }
            to={link.url}
            key={v4()}
          >
            <span className="">{link.icon}</span>
            {/* {link.title} */}
          </NavLink>
        );
      })}
    </div>
  );
};
