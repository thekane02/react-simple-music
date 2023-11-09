import React from "react";

const Button = ({ type = "button", children, className, onClick }) => {
  return (
    <button
      className={`${
        className ? className : "bg-primary-gradient"
      } text-white rounded-md font-semibold block text-lg px-4 py-2 min-w-[180px] mx-auto transition-all`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
