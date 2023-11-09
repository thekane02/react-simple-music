import React from "react";

const FieldCheckboxes = ({ children, className }) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-5 mb-6 text-white min-h-[44px] ${className}`}
    >
      {children}
    </div>
  );
};

export default FieldCheckboxes;
