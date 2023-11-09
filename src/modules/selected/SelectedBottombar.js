import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import useGenerateTrack from "../../hooks/useGenerateTrack";
import Player from "../player/Player";

const SelectedBottombar = () => {
  // const dispatch = useDispatch();
  // const player = useSelector((state) => state.player);

  // const { setSongs, audioUrl } = useGenerateTrack(player.tracks);
  // useEffect(() => {
  //   setSongs(player?.tracks);
  // }, [player]);

  // return (
  //   <div className="fixed bottom-0 flex items-center justify-center w-full h-player-height">
  //     <span className="absolute">{player?.tracks[0]?.title}</span>
  //     <AudioPlayer
  //       showJumpControls={false}
  //       showSkipControls={true}
  //       autoPlay
  //       src={audioUrl}
  //       onPlay={(e) => console.log("onPlay")}
  //       layout="stacked-reverse"
  //     />
  //   </div>
  // );
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center h-player-height z-[100]">
      <Player></Player>
    </div>
  );
};

export default SelectedBottombar;
