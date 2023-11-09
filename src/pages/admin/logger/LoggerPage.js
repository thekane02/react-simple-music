import { Button } from "components/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLoggers } from "redux/apiRequest";
import calculateTime from "utils/calculateTime";

const LoggerPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listLogger = useSelector((state) => state.logger.loggers?.allLoggers);
  const [visible, setVisible] = useState(20);
  const [increment, setIncrement] = useState(20);
  const loadMore = () => {
    setVisible(visible + increment);
  };
  useEffect(() => {
    getAllLoggers(admin?.admin_token, dispatch);
  }, []);
  return (
    <div className="max-h-[96vh] overflow-auto p-10 bg-primary text-white">
      {listLogger.slice(0, visible).map((logger) => (
        <div className="flex justify-between p-2 border-b border-alpha-bg">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                logger.level === "admin"
                  ? "bg-pink-300"
                  : logger.level === "artist"
                  ? "bg-orange-300"
                  : "bg-blue-300"
              }`}
            ></span>
            <p className={`font-semibold `}>{logger.log}</p>
          </div>
          <p className="text-sm">{calculateTime(logger.time)}</p>
        </div>
      ))}
      <div className="flex justify-center">
        <Button className="mt-2 bg-blue-500" onClick={loadMore}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default LoggerPage;
