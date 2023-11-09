import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";

const ButtonGoogle = ({ text = "Sign up with google", onClick = () => {} }) => {
  return (
    <button
      className="flex items-center justify-center w-full text-base font-semibold text-white shadow-slate-800 bg-[#4285f4] p-[2px] rounded-sm border-strock"
      onClick={onClick}
    >
      <img
        className="p-2 bg-white max-w-[36px] rounded-sm"
        srcSet="/icon-gg.png 2x"
        alt="icon-google"
      />
      <span className="px-2">{text}</span>
    </button>
  );
};
ButtonGoogle.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default withErrorBoundary(ButtonGoogle, {
  FallbackComponent: ErrorComponent,
});
