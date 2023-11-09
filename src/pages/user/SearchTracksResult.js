import Heading from "components/common/Heading";
import useSearch from "hooks/useSearch";
import TrackItem from "modules/track/TrackItem";
import React from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const SearchTracksResult = () => {
  const { keyword } = useParams();
  const { setUrl, data } = useSearch(`/search?keyword=${keyword}`, {});
  return (
    <div>
      <Heading>Songs</Heading>
      <div className="grid grid-cols-2 gap-x-10">
        {data?.tracks?.length > 0 &&
          data?.tracks.map((track) => (
            <TrackItem key={v4()} song={track}></TrackItem>
          ))}
      </div>
    </div>
  );
};

export default SearchTracksResult;
