import HeadingOverView from "components/common/HeadingOverView";
import { IconPlayToggle } from "components/icons";
import PlayerV2 from "modules/player/PlayerV2";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const { default: axios } = require("api/axios");

const PlaylistDetail = () => {
  const [playlist, setPlaylist] = useState({});
  const { slug } = useParams();
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePickTrack = (i) => {
    setIndex(i);
  };
  const hanldePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    axios
      .get(`/admin/playlist/${slug}`, {
        headers: { Authorization: `Bearer ${ad?.admin_token}` },
      })
      .then((response) => {
        setPlaylist(response.data);
      });
  }, [slug]);
  console.log(playlist);
  return (
    <div className="flex flex-col h-[90vh] gap-4">
      <HeadingOverView
        total={playlist?.tracks?.length}
        imgUrl="/bg-3.jpg"
        type={`tracks`}
      ></HeadingOverView>
      <div className="flex flex-1 gap-6">
        <div className="min-h-[42vh] w-[60%] bg-white rounded-md relative">
          <div
            className="absolute top-0 bottom-0 left-0 right-0 blur-sm brightness-75"
            style={{
              backgroundImage: `url('${playlist.picture}')`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex gap-4 p-4">
            <div className="w-[300px] text-white">
              <img
                src={`${playlist.picture}`}
                className="object-cover w-full rounded-lg h-[300px]"
                alt=""
              />
              <div className="p-2 text-center">
                <h3 className="text-xl font-bold">{playlist.title}</h3>
                <p className="">Owner: {playlist.owner}</p>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-[rgba(0,0,0,0.5)] text-white  rounded-md">
              {playlist.tracks > 0 ? (
                playlist.tracks.map((item, i) => (
                  <div
                    onClick={() => handlePickTrack(i)}
                    key={v4()}
                    className={`${
                      index === i ? "bg-alpha-bg" : ""
                    } flex items-center gap-2 cursor-pointer w-full text-lg p-4`}
                  >
                    <span onClick={hanldePlayPause}>
                      <IconPlayToggle
                        playing={index === i && isPlaying}
                      ></IconPlayToggle>
                    </span>
                    {item.title}
                  </div>
                ))
              ) : (
                <p className="text-center">No song exists</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          {Object.keys(playlist).length > 0 && (
            <PlayerV2
              setPlaying={setIsPlaying}
              handlePlayPause={hanldePlayPause}
              isPlaying={isPlaying}
              songs={playlist.tracks}
              index={index}
              setAudioIndex={setIndex}
            ></PlayerV2>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
