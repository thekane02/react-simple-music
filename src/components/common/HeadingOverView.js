import React from "react";
import CountUp from "react-countup";

const HeadingOverView = ({ imgUrl = "/bg-3.jpg", total, type }) => {
  return (
    <div
      className="h-[15vh] w-full mb-4 relative rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center 40%",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.1)]"></div>
      <div className="absolute flex flex-col items-center text-5xl font-semibold text-white left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 font-secondary">
        <CountUp duration={2.75} end={total} />
        {type}
      </div>
    </div>
  );
};

export default HeadingOverView;
