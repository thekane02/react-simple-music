import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { openModal } from "store/global/global-slice";

const panelItemClass = "px-10 block py-2 hover:bg-alpha-bg cursor-pointer";
const TrackPanel = ({ song, show, nodeRef }) => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const isRerender = useSelector((state) => state.global.tempBoolean);
  const [playlists, setPlaylists] = useState({});
  const getPlaylistsUser = async () => {
    const res = await axios.get("/playlist");
    setPlaylists(res.data);
  };
  const addTrackToPlaylist = async (trackId, playlistId) => {
    await axios
      .put(`/playlist/add/${playlistId}`, {
        trackId,
      })
      .then((res) => {
        toast.success("Add track success!");
      })
      .catch((err) => toast.error("Add failed!"));
  };

  useEffect(() => {
    getPlaylistsUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRerender]);
  return (
    <div>
      <ul
        ref={nodeRef}
        className={`${
          show ? "flex" : "hidden"
        } absolute bottom-0 right-0 flex-col list-none rounded-md bg-primary z-[99999999999] min-w-[220px] max-w-[240px]`}
      >
        <li className="flex items-center gap-3 p-2 my-2 mx-4 bg-[rgba(0,0,0,0.2)] rounded-md w-[200px]">
          <img
            className=" h-[40px] rounded-sm object-cover"
            src="/admin.jpg"
            alt=""
          />
          <div className="flex flex-col gap-1 max-w-[70%]">
            <h3 className="overflow-hidden text-sm whitespace-nowrap text-ellipsis">
              {song?.title}
            </h3>
            <div className="flex">
              <div className="flex items-center gap-1 mr-4 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Zm0-2.7q2.4-2.15 3.95-3.688t2.45-2.674q.9-1.138 1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.688T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025q.9 1.137 2.45 2.675T12 18.3Zm0-6.825Z"
                  />
                </svg>
                {song?.likes}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21q-.825 0-1.413-.588T3 19v-7q0-1.875.713-3.513t1.924-2.85q1.213-1.212 2.85-1.924T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12v7q0 .825-.588 1.413T19 21h-2q-.825 0-1.413-.588T15 19v-4q0-.825.588-1.413T17 13h2v-1q0-2.925-2.038-4.963T12 5Q9.075 5 7.037 7.038T5 12v1h2q.825 0 1.413.588T9 15v4q0 .825-.588 1.413T7 21H5Zm0-2h2v-4H5v4Zm12 0h2v-4h-2v4ZM5 19h2h-2Zm12 0h2h-2Z"
                  />
                </svg>
                {song?.listens}
              </div>
            </div>
          </div>
        </li>
        <li className="relative group/item">
          <Link className={`${panelItemClass}`} to="#">
            Thêm vào playlist
            <span className="absolute right-3 top-2/4 -translate-y-2/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
                />
              </svg>
            </span>
          </Link>
          <div className="top-0 absolute w-full rounded-md hidden bg-primary -left-[calc(100%-4px)] shadow-shadow-r list-none group-hover/item:block overflow-hidden">
            <div
              onClick={() => {
                dispatch(openModal("create_playlist"));
              }}
              className={`${panelItemClass} flex border-b border-alpha-bg gap-2 items-center`}
            >
              <span className="p-[2px] rounded-md bg-secondary-gradient">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={18}
                    strokeDashoffset={18}
                    strokeLinecap="round"
                    strokeWidth={2}
                  >
                    <path d="M12 5V19">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.4s"
                        dur="0.3s"
                        values="18;0"
                      />
                    </path>
                    <path d="M5 12H19">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.3s"
                        values="18;0"
                      />
                    </path>
                  </g>
                </svg>
              </span>
              New playlist
            </div>
            <ul className="overflow-auto list-none min-h-[120px] min-w-[180px] max-h-[220px]">
              {playlists && playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <li
                    key={v4()}
                    onClick={() => addTrackToPlaylist(song._id, playlist._id)}
                    className={`${panelItemClass} flex gap-2 items-center`}
                  >
                    <span className="p-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth={4}
                        >
                          <path strokeLinecap="round" d="M29 6v29" />
                          <path d="M15 36.04A5.04 5.04 0 0 1 20.04 31H29v5.96A5.04 5.04 0 0 1 23.96 42h-3.92A5.04 5.04 0 0 1 15 36.96v-.92Z" />
                          <path
                            strokeLinecap="round"
                            d="m29 14.066l12.883 3.056V9.013L29 6v8.066Z"
                            clipRule="evenodd"
                          />
                          <path
                            strokeLinecap="round"
                            d="M6 8h14M6 16h14M6 24h10"
                          />
                        </g>
                      </svg>
                    </span>
                    {playlist.title}
                  </li>
                ))
              ) : (
                <div className="m-auto">Empty</div>
              )}
            </ul>
          </div>
        </li>
        <li>
          <Link className={panelItemClass} to="#">
            Thêm vào playlist
          </Link>
        </li>
        <li>
          <Link className={panelItemClass} to="#">
            Thêm vào playlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TrackPanel;
