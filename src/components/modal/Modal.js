import React from "react";

const Modal = ({ show, heading, onClose, children }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } h-[100vh] left-0 right-0 top-0 bottom-0 bg-[rgba(0,_0,_0,_0.5)] flex justify-center items-center z-[999]`}
      onClick={onClose}
    >
      <div
        className="absolute overflow-hidden bg-white rounded-xl"
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
