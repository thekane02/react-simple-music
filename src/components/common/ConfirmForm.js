import { Button } from "components/button";
import React from "react";

const ConfirmForm = ({
  msg = "Are you sure?",
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div className="flex flex-col items-center max-w-[500px] gap-10 p-10 text-white bg-bg-color-2">
      <p className="text-2xl font-semibold text-center">{msg}</p>
      <div className="flex gap-4">
        <Button className="bg-green-500" onClick={handleConfirm}>
          OK
        </Button>
        <Button className="bg-gray-500" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
