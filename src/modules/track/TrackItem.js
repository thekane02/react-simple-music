import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconHeartToggle from "components/icons/IconHeartToggle";
import { IconMore, IconPlayToggle } from "components/icons";
import { Link } from "react-router-dom";
import TrackPanel from "./TrackPanel";
import { playPause, setPlaylist } from "redux/user/playerSlice";
import formatDuration from "utils/formatDuration";
import useAxiosPrivate from "hooks/useAxiosPrivate";

// const centerClass = "flex justify-center";
// const panelItemClass = "px-10 block py-2 hover:bg-alpha-bg cursor-pointer";

const TrackItem = ({
  song,
  isPlaying = false,
  activeSong,
  isLiked,
  owner = "",
  onlyTitle = false,
  children,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const playPlayer = useSelector((state) => state.player.isPlaying);
  const currentSong = useSelector(
    (state) => state.player.tracks[state.player.currentTrackIndex]
  );
  activeSong = song?._id === currentSong?._id;
  if (activeSong) isPlaying = playPlayer;
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(isLiked);
  const [showPanel, setShowPanel] = useState(false);
  const ref = useRef(null);
  const moreBtnRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !moreBtnRef.current.contains(event.target)
      ) {
        setShowPanel(false);
      }
    }
    function handleScroll() {
      setShowPanel(false);
    }

    document.addEventListener("click", handleClickOutside);
    document.querySelector(".user-main") &&
      document
        .querySelector(".user-main")
        .addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.querySelector(".user-main") &&
        document
          .querySelector(".user-main")
          .removeEventListener("scroll", handleScroll);

      // setShowPanel(true);
    };
  }, [ref]);

  const handleShowPanel = () => {
    setShowPanel(true);
  };
  // console.log(showPanel);
  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };
  const handleToggleLikeTrack = async (song) => {
    if (!liked) {
      await axiosPrivate.put(`/user/like/${song._id}`, {});
    } else {
      await axiosPrivate.put(`/user/unlike/${song._id}`, {});
    }
    setLiked(!liked);
  };
  const handlePlayClick = () => {
    if (isPlaying) {
      dispatch(playPause(false));

      isPlaying = false;
    } else {
      if (song?._id !== currentSong?._id) dispatch(setPlaylist([song]));
      dispatch(playPause(true));
      isPlaying = true;
    }
  };
  return (
    // bg-[hsla(0,1%,20%,0.8)]
    onlyTitle ? (
      <div
        className={` items-center gap-16 px-4 py-2 mb-2 group text-white border-b border-[rgba(225,225,225,0.2)] rounded-sm hover:bg-[#ffffff1a] ${
          activeSong ? "bg-[#ffffff1a]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="cursor-pointer" onClick={() => handlePlayClick()}>
            <IconPlayToggle playing={isPlaying}></IconPlayToggle>
          </span>
          <h3 className="overflow-hidden whitespace-nowrap text-ellipsis">
            {song?.title || "unknown"} - {song.artist.firstName}
          </h3>
        </div>
      </div>
    ) : (
      <div
        className={` items-center flex px-4 py-2 mb-2 group text-white border-b border-[rgba(225,225,225,0.2)] rounded-sm hover:bg-[#ffffff1a] ${
          activeSong ? "bg-[#ffffff1a]" : ""
        }`}
      >
        <div className="flex items-center w-2/5 gap-3">
          <span className="cursor-pointer" onClick={() => handlePlayClick()}>
            <IconPlayToggle playing={isPlaying}></IconPlayToggle>
          </span>
          <div className="flex flex-col">
            <h3 className="">{song.title || "unknown"}</h3>
            <Link
              to={`/artists/${song?.artist?._id ? song.artist._id : owner._id}`}
              className="text-xs hover:text-secondary"
            >
              {song?.artist?.firstName
                ? song?.artist?.firstName
                : owner.firstName}
            </Link>
          </div>
        </div>
        {/* <p className="text-xs text-center text-lime-50">
        {calculateTime("2022-6-14")}
      </p> */}
        <div className="grid flex-1 grid-cols-3">
          <div className="flex items-center justify-center">{song.listens}</div>
          <p className="text-sm text-center">{formatDuration(song.duration)}</p>

          <div className="relative flex items-center justify-end gap-3">
            <span className="flex justify-center opacity-0 select-none group-hover:opacity-100">
              <IconHeartToggle
                liked={liked}
                onClick={() => handleToggleLikeTrack(song)}
              ></IconHeartToggle>
            </span>
            <span
              className="cursor-pointer select-none"
              onClick={handleShowPanel}
              ref={moreBtnRef}
            >
              <IconMore></IconMore>
            </span>
            {/* <span className="opacity-0 select-none group-hover:opacity-100"> */}
            {children}
            {/* </span> */}
            <TrackPanel song={song} nodeRef={ref} show={showPanel}></TrackPanel>
          </div>
        </div>
      </div>
    )
  );
};

export default TrackItem;
