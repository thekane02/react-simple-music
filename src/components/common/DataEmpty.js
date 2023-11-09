import React from "react";

const DataEmpty = ({ msg, text = "white" }) => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center select-none opacity-95">
      <img src="/empty.png" alt="" />
      <p
        className="text-4xl font-secondary"
        style={{
          color: text,
        }}
      >
        {msg}
      </p>
    </div>
  );
};

export default DataEmpty;
