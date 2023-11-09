import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function useGenerateTrack(initialSongs) {
  // const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [songs, setSongs] = useState(initialSongs);
  const index = useSelector((state) => state.player.currentTrackIndex);

  // useEffect(() => {
  //   setAudioChunks([]);
  //   const socket = new io("ws://localhost:3000/track");
  //   socket.emit("play", {
  //     trackId: songs[index]?._id,
  //   });
  //   socket.on("message", (data) => {
  //     setAudioChunks((chunks) => [...chunks, data.data]);
  //   });
  //   return () => {
  //     socket.close();
  //   };
  // }, [songs, index]);
  // useEffect(() => {
  //   if (audioChunks.length > 0) {
  //     const blob = new Blob(audioChunks, { type: "audio/mpeg" });
  //     const audioUrl = URL.createObjectURL(blob);
  //     setAudioUrl(audioUrl);
  //   }
  // }, [audioChunks]);
  // console.log(audioUrl);
  return {
    setSongs,
    audioUrl,
  };
}
