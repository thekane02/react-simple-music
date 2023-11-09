import React, { useEffect, useState } from "react";
import GridView from "components/common/GridView";
import AlbumItem from "modules/album/AlbumItem";
import Modal from "components/modal/Modal";
import { Label } from "components/label";
import { Button } from "components/button";
import LayoutForm from "layout/LayoutForm";
import FormGroup from "components/common/FormGroup";
import { v4 } from "uuid";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "store/global/global-slice";

const PlaylistPage = () => {
  const axios = useAxiosPrivate();
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);

  const getAllPlaylists = async () => {
    await axios
      .get("/playlist")
      .then((response) => setPlaylists(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.tempBoolean]);
  console.log(playlists);
  return (
    <div className="py-2">
      <GridView>
        <div
          className="flex flex-col items-center justify-center text-white w-[290px] border-2 border-[rgba(255,255,255,0.2)] rounded-md hover:text-secondary cursor-pointer group gap-3 text-lg transition-all min-h-[290px]"
          onClick={() => {
            dispatch(openModal("create_playlist"));
          }}
        >
          <span className="w-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-16 h-16 transition-all group-hover:stroke-secondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          Add a new playlist
        </div>
        {playlists.map((playlist) => (
          <AlbumItem
            key={v4()}
            isPlaylist={true}
            id={playlist._id}
            title={playlist.title}
            textColor="white"
          ></AlbumItem>
        ))}
      </GridView>
    </div>
  );
};

export default PlaylistPage;
