import Heading from "components/common/Heading";
import useSearch from "hooks/useSearch";
import ArtistCard from "modules/artist/ArtistCard";
import React from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const SearchArtistsResult = () => {
  const { keyword } = useParams();
  const { setUrl, data } = useSearch(`/search?keyword=${keyword}`, {});
  return (
    <div>
      <Heading>Artists</Heading>
      <div className="grid grid-cols-5 gap-4">
        {data?.artists?.length > 0 &&
          data?.artists.map((artist) => (
            <ArtistCard idArtist={artist?._id} key={v4()}></ArtistCard>
          ))}
      </div>
    </div>
  );
};

export default SearchArtistsResult;
