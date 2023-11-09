import React from "react";
import { io } from "socket.io-client";

const Logger = () => {
  const loggers = [];
  const socket = new io("ws://localhost:3000/notification");
  socket.on("notification", (data) => {
    console.log(data);
  });
  return <div></div>;
};

export default Logger;
