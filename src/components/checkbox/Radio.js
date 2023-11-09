import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center p-1 text-transparent ${
            checked ? "border-secondary" : "border-primary"
          }`}
        >
          <span
            className={
              checked ? "w-[16px] h-[16px] bg-secondary rounded-full " : ""
            }
          ></span>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
