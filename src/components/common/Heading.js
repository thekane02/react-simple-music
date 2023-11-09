import React from "react";

const Heading = ({ children }) => {
  return (
    <h3 className="mb-4 text-2xl font-semibold text-white heading">
      {children}
    </h3>
  );
};

export default Heading;
