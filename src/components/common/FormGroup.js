import React from "react";

const FormGroup = ({ children, className }) => {
  return <div className={`flex flex-col mb-6 ${className}`}>{children}</div>;
};

export default FormGroup;
