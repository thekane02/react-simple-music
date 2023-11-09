import Heading from "components/common/Heading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLoggers } from "redux/apiRequest";
import calculateTime from "utils/calculateTime";

const ListLogger = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listLogger = useSelector((state) => state.logger.loggers?.allLoggers);
  useEffect(() => {
    getAllLoggers(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);

  return (
    <>
      {/* <div>
        <input
          type="text"
          placeholder="Search by level"
          value={searchLevel}
          onChange={(e) => setSearchLevel(e.target.value)}
        />
      </div>
      <div>
        {listLogger &&
          listLogger
            .filter((item) =>
              item.level.toLowerCase().includes(searchLevel.toLowerCase())
            )
            .map((item) => (
              <div key={item._id}>
                <label>Level:</label> &nbsp;
                {item.level}
                <br></br>
                <label>Username:</label> &nbsp;
                {item.username}
                <br></br>
                <label>Time:</label> &nbsp;
                {item.time}
                <br></br>
                <label>Log:</label> &nbsp;
                {item.log}
                <br></br>
                ----------------------------------------
              </div>
            ))}
      </div> */}
      <div className="flex flex-col justify-center gap-4 mt-10">
        <div className="grid grid-cols-6 gap-4 m-auto w-[60%] mb-5 font-secondary text-center font-semibold text-lg">
          <Link
            to="/admins"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #admins
          </Link>
          <Link
            to="/artists"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #artists
          </Link>
          <Link
            to="/users"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #users
          </Link>
          <Link
            to="/tracks"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #tracks
          </Link>
          <Link
            to="/playlists"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #playlists
          </Link>
          <Link
            to="/albums"
            className="block px-6 py-2 border-2 rounded-md border-primary"
          >
            #albums
          </Link>
        </div>
        <div className="m-auto w-[96%] h-[82vh] border-2 shadow-shadow-1 rounded-md bg-primary p-4">
          <div className="flex items-center justify-between">
            <Heading>Recent Activity</Heading>
            <Link to="/logger" className="text-white">
              See all
            </Link>
          </div>
          <div className="grid w-full h-full grid-cols-3 gap-8 px-8 pt-2 pb-8">
            <div className="w-full h-full p-4 m-auto overflow-auto bg-pink-400 rounded-md">
              <div className="flex flex-col justify-center w-full h-full gap-3 p-1 text-sm font-semibold ">
                {listLogger &&
                  listLogger
                    .filter((item) => item.level === "admin")
                    .slice(0, 10)
                    .map((item) => (
                      <div className="flex items-center bg-[rgba(0,0,0,0.2)] rounded-md p-2 text-white gap-2 justify-between">
                        <p className="line-clamp-2 w-[70%]">{item.log}</p>
                        <p className="text-xs font-thin text-center w-[20%]">
                          {calculateTime(item.time)}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
            <div className="w-full h-full px-2 m-auto overflow-auto bg-orange-400 rounded-md">
              <div className="flex flex-col justify-center w-full h-full gap-3 p-1 text-sm font-semibold ">
                {listLogger &&
                  listLogger
                    .filter((item) => item.level === "artist")
                    .slice(0, 10)
                    .map((item) => (
                      <div className="flex items-center bg-[rgba(0,0,0,0.2)] rounded-md py-2 px-4 text-white gap-2 justify-between">
                        <p className="line-clamp-2 w-[70%]">{item.log}</p>
                        <p className="text-xs font-thin text-center w-[20%]">
                          {calculateTime(item.time)}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
            <div className="w-full h-full px-2 m-auto bg-blue-400 rounded-md">
              <div className="flex flex-col justify-center w-full h-full gap-3 p-1 text-sm font-semibold ">
                {listLogger &&
                  listLogger
                    .filter((item) => item.level === "user")
                    .slice(0, 10)
                    .map((item) => (
                      <div className="flex items-center bg-[rgba(0,0,0,0.2)] rounded-md py-2 px-4 text-white gap-2 justify-between">
                        <p className="line-clamp-2 w-[70%]">{item.log}</p>
                        <p className="text-xs font-thin text-center w-[20%]">
                          {calculateTime(item.time)}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListLogger;
