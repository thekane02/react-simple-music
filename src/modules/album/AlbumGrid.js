import React from "react";

const AlbumGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-5 mt-2 mb-6 gap-x-auto gap-y-4">
      {children}
    </div>
  );
};

export default AlbumGrid;
// flex flex-wrap justify-between
