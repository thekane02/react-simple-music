import React from "react";

const LayoutForm = ({ title, children }) => {
  return (
    <div
      className={`absolute inset-0 min-h-[500px] flex flex-col justify-center items-center max-h-[90vh] w-[800px] z-10 gap-4 px-52`}
    >
      <h3 className="inline-block text-4xl font-semibold text-center text-white capitalize">
        {title}
      </h3>
      {/* <div className="flex flex-col items-center w-full max-h-[calc(100% - 140px - 120px)] overflow-auto"> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default LayoutForm;
