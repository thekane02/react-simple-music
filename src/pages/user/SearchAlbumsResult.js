import Heading from "components/common/Heading";
import useSearch from "hooks/useSearch";
import AlbumGrid from "modules/album/AlbumGrid";
import AlbumItem from "modules/album/AlbumItem";
import React from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const SearchAlbumsResult = () => {
  const { keyword } = useParams();
  const { setUrl, data } = useSearch(`/search?keyword=${keyword}`, {});
  return (
    <div>
      <Heading>Albums</Heading>
      <AlbumGrid>
        {data?.albums?.length > 0 &&
          data?.albums
            .slice(0, 5)
            .map((album) => (
              <AlbumItem
                id={album?._id}
                thumb={album?.coverArtUrl}
                title={album?.title}
                textColor="white"
                key={v4()}
              ></AlbumItem>
            ))}
      </AlbumGrid>
    </div>
  );
};

export default SearchAlbumsResult;
