import React from "react";

const Label = ({ htmlFor = "", children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={`inline-block mb-2 text-[16px] font-medium text-white ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
