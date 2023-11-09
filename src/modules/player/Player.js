import React, { useState, useRef, useEffect } from "react";
import Slider from "rc-slider";
import {
  IconNextSong,
  IconPlayToggle,
  IconPrevSong,
  IconSpeaker,
} from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import "./Player.scss";
import {
  nextTrack,
  playPause,
  prevTrack,
  setVolume,
} from "redux/user/playerSlice";
import axios from "api/axios";
import formatDuration from "utils/formatDuration";
// import "rc-slider/assets/index.css";

const Player = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);
  // const player = useSelector((state) => state.player);
  const [currentVolume, setCurrentVolume] = useState(100);
  const audios = [];
  const [isPlay, setPlay] = useState(false);
  // const { setSongs, audioUrl } = useGenerateTrack(audios);
  const [songs, setSongs] = useState(audios);
  const dispatch = useDispatch(audios);
  // const token = useSelector((state) => state.auth.login.currentUser.jwt);
  // const index = useSelector((state) => state.player.currentTrackIndex);
  // setSongs(player.tracks);

  useEffect(() => {
    dispatch(playPause(false));
  }, []);

  // useEffect(() => {
  //   setSongs(player?.tracks);
  //   setPlay(player.isPlaying);
  //   // playPause(true);
  //   if (!player.isPlaying) audioRef.current && audioRef.current.pause();
  //   else audioRef.current && audioRef.current.play();
  // }, [player]);

  // const handleLoadedData = (id) => {
  //   axios
  //     .get(`/track/info/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setDuration(res.data.duration))
  //     .catch((err) => console.log(err));
  //   if (isPlay) audioRef.current.play();
  // };
  console.log(isPlay);

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
      // dispatch(playPause(false));
    } else {
      audioRef.current.play();
      // dispatch(playPause(true));
    }
    setPlay(!isPlay);
    dispatch(playPause(!isPlay));
  };

  const handleTimeSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    if (!isPlay) {
      setPlay(true);
      console.log(isPlay);
      audioRef.current.play();
    }
    console.log(value);
  };
  // console.log(currentTime);
  const handleVolumeSliderChange = (value) => {
    const volume = value / 100;
    audioRef.current.volume = volume;
    setCurrentVolume(value);
    dispatch(setVolume(value));
  };
  // console.log(audioRef.current.src);

  return (
    <div className="bg-[rgba(29,_33,_35,_0.30)] backdrop-blur-lg flex items-center text-white justify-between py-4 px-10 w-full h-full">
      <div className="flex items-center gap-3 w-[32%]">
        <img
          className="Song-Thumbnail w-[80px] rounded-md"
          src="/logoWithoutText.png"
          alt="tet"
        />
        <div>
          <h2 className="Song-Title">
            {audios[audioIndex]?.title || "No songs are playing"}
          </h2>
          <p className="Singer">{audios[audioIndex]?.artist?.nickName || ""}</p>
        </div>
      </div>

      {/* Control-Button-Group Wrapper */}
      <div className="w-[36%]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div
            className="Prev-Button"
            onClick={() => {
              setAudioIndex((audioIndex - 1) % audios.length);
              dispatch(prevTrack());
            }}
          >
            <IconPrevSong></IconPrevSong>
          </div>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary Pause-Play-Button shadow-[0px_0px_18px_0px_rgba(255,_255,_255,_0.30)]"
            onClick={handlePausePlayClick}
          >
            <IconPlayToggle
              hover={false}
              currentColor={"black"}
              playing={isPlay}
            ></IconPlayToggle>
          </div>
          <div
            className="Next-Button"
            onClick={() => {
              setAudioIndex((audioIndex + 1) % audios.length);
              dispatch(nextTrack());
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
            max={duration}
            value={currentTime}
            onChange={handleTimeSliderChange}
            handleStyle={{
              transform: "translateX(0)",
            }}
          />
          <p>{formatDuration(duration)}</p>
        </div>
        {/* {songs[index]?.fileId && ( */}
        <audio
          ref={audioRef}
          // src={`${process.env.REACT_APP_API}/file/${songs[index]?.fileId}`}
          // onLoadedData={() => handleLoadedData(songs[index]?._id)}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onEnded={() => setPlay(false)}
        />
        {/* )} */}
      </div>
      <div className="flex items-center gap-4 select-none w-[32%] justify-end">
        {/* icon */}
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
    </div>
  );
};

export default Player;
