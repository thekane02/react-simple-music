import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import TrackItem from "modules/track/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import { IconPlayToggle } from "components/icons";
import { playPause, setPlaylist } from "redux/user/playerSlice";
import DataEmpty from "components/common/DataEmpty";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const SongsFavoritePage = () => {
  const axios = useAxiosPrivate();
  const [songsLiked, setSongsLiked] = useState([]);
  console.log(
    "🚀 ~ file: SongsFavoritePage.js:13 ~ SongsFavoritePage ~ songsLiked:",
    songsLiked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/user/likes")
      .then((res) => {
        setSongsLiked(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {songsLiked && songsLiked.length > 0 ? (
        <div className="flex gap-6">
          <div className="flex flex-col w-1/5 gap-2">
            <img
              className="object-cover w-full rounded-lg"
              src="/thumb-5.avif"
              alt=""
            />
            <div className="flex flex-col items-center gap-2 text-white">
              <h3 className="text-2xl font-semibold text-center text-white font-secondary">
                Songs favorite
              </h3>
              <div className="flex items-center justify-center gap-1 text-sm text-white">
                <p>{songsLiked && songsLiked.length} songs ~</p>
                <p className="">
                  {songsLiked?.length > 0 &&
                    Math.floor(
                      songsLiked.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.duration,
                        0
                      ) / 60
                    )}
                  + minutes
                </p>
              </div>
              <div className="flex gap-3 rounded-full bg-alpha-bg w-[140px] p-2 items-center cursor-default select-none">
                <span
                  className="flex items-center justify-center rounded-full bg-primary w-[36px] h-[36px] cursor-pointer"
                  onClick={() => {
                    dispatch(setPlaylist(songsLiked));
                    dispatch(playPause(true));
                  }}
                >
                  <IconPlayToggle></IconPlayToggle>
                </span>
                Play all
              </div>
            </div>
          </div>
          <div className="flex-1">
            {songsLiked && songsLiked.length > 0
              ? songsLiked.map((track) => (
                  <TrackItem
                    key={v4()}
                    song={track}
                    isLiked={songsLiked.includes(track)}
                  ></TrackItem>
                ))
              : "Empty"}
          </div>
        </div>
      ) : (
        <DataEmpty
          msg="
          You haven't liked a song yet!
"
        ></DataEmpty>
      )}
    </div>
  );
};

export default SongsFavoritePage;
