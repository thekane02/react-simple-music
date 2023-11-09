import React, { useState, useRef } from "react";
import Slider from "rc-slider";
import {
  IconNextSong,
  IconPlayToggle,
  IconPrevSong,
  IconSpeaker,
} from "components/icons";
import "./Player.scss";
import formatDuration from "utils/formatDuration";
import axios from "api/axios";
import { useSelector } from "react-redux";

const PlayerV2 = ({
  songs,
  index = 0,
  setPlaying,
  children,
  setAudioIndex,
  isPlaying = false,
  handlePlayPause,
  role = "Admin",
  isFetching = false,
  otherFunction,
}) => {
  const audioRef = useRef();
  // const [audioIndex, setAudioIndex] = useState(index);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [track, setTrack] = useState({});
  const ad = useSelector((state) => state.auth.login);

  React.useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);
  const handleLoadedData = () => {
    if (isPlaying) audioRef.current.play();
  };
  const handlePausePlayClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    handlePlayPause && handlePlayPause();
  };

  const handleTimeSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    if (!isPlaying) {
      setPlaying(true);
      audioRef.current.play();
    }
  };
  const handleVolumeSliderChange = (value) => {
    const volume = value / 100;
    audioRef.current.volume = volume;
    setCurrentVolume(value);
  };

  React.useEffect(() => {
    // setAudioIndex(index);
    role === "Admin" &&
      songs &&
      songs?.length > 0 &&
      axios
        .get(`/admin/track/${songs[index]._id}`, {
          headers: { Authorization: `Bearer ${ad?.currentUser?.admin_token}` },
        })
        .then((response) => {
          setTrack(response.data);
        });
    // role === "Artist" && isFetching ? '' : setTrack(songs);
    if (role === "Artist") {
      if (isFetching && songs?.length > 0)
        axios
          .get(`/artist/track/${songs[index]._id}`, {
            headers: { Authorization: `Bearer ${ad?.token}` },
          })
          .then((response) => {
            setTrack(response.data);
            otherFunction(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      else setTrack(songs);
    }
  }, [index]);
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full p-4 text-white rounded-md bg-[rgba(0,0,0,0.6)]"
      style={{
        backgroundImage: "url('/wallpaper-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "75% 75%",
      }}
    >
      <div className="flex flex-col items-center w-full gap-3 mb-4">
        <img
          className="w-[35%] rounded-md Song-Thumbnail"
          src="/logoWithoutText.png"
          alt="tet"
        />
        <div>
          <h2 className="p-1 text-white rounded-md">
            {(songs?.length > 0 && songs[index]?.title) ||
              "No songs are playing"}
          </h2>
          <p className="Singer">
            {(songs?.length > 0 && songs[index]?.artist?.nickName) || ""}
          </p>
        </div>
      </div>

      {/* Control-Button-Group Wrapper */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div
            className="Prev-Button"
            onClick={() => {
              setAudioIndex((index - 1) % songs.length);
            }}
          >
            <IconPrevSong></IconPrevSong>
          </div>
          <div
            className="p-1 bg-white rounded-full Pause-Play-Button"
            onClick={handlePausePlayClick}
          >
            <IconPlayToggle
              hover={false}
              currentColor={"black"}
              playing={isPlaying}
            ></IconPlayToggle>
          </div>
          <div
            className="Next-Button"
            onClick={() => {
              setAudioIndex((index + 1) % songs.length);
            }}
          >
            <IconNextSong></IconNextSong>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p>{formatDuration(currentTime)}</p>
          <Slider
            className="my-slider"
            min={0}
            max={track ? track.duration : ""}
            value={currentTime}
            onChange={handleTimeSliderChange}
            handleStyle={{
              transform: "translateX(0)",
            }}
          />
          <p>
            {/* {formatDuration(
              track?.duration
                ? track?.duration
                : songs?.length > 0 && songs[index]?.duration
            )} */}
            {track?.duration
              ? formatDuration(track?.duration)
              : songs?.length > 0 && formatDuration(songs[index]?.duration)}
          </p>
        </div>
        <audio
          ref={audioRef}
          src={track?.link || (songs?.length > 0 && songs[index]?.link)}
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onEnded={() => handlePlayPause()}
        />
      </div>
      <div className="flex items-center gap-4 select-none w-[32%] justify-center">
        <div className="flex items-center gap-2">
          <IconSpeaker currentVolume={currentVolume}></IconSpeaker>
          <Slider
            className="w-20"
            step={0.01}
            min={0}
            max={100}
            value={currentVolume}
            onChange={handleVolumeSliderChange}
            handleStyle={{
              transform: "translateX(0)",
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PlayerV2;
