import Heading from "components/common/Heading";
import useSearch from "hooks/useSearch";
import AlbumGrid from "modules/album/AlbumGrid";
import AlbumItem from "modules/album/AlbumItem";
import ArtistCard from "modules/artist/ArtistCard";
import TrackItem from "modules/track/TrackItem";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";

const SearchResultPage = () => {
  const { keyword } = useParams();
  const { setUrl, data } = useSearch(`/search?keyword=${keyword}`, {});
  useEffect(() => {
    setUrl(`/search?keyword=${keyword}`);
  }, [keyword]);
  console.log(data);
  return (
    <div>
      {data?.tracks?.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <Heading>Songs</Heading>
            {data?.tracks?.length > 6 && (
              <Link to={`/search_tracks/${keyword}`} className="text-white">
                See All
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-10">
            {data.tracks.slice(0, 6).map((track) => (
              <TrackItem key={v4()} song={track}></TrackItem>
            ))}
          </div>
        </div>
      )}
      {data?.albums?.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <Heading>Albums</Heading>
            {data?.albums?.length > 5 && (
              <Link to={`/search_albums/${keyword}`} className="text-white">
                See All
              </Link>
            )}
          </div>
          <AlbumGrid>
            {data?.albums.slice(0, 5).map((album) => (
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
      )}
      {data?.artists?.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <Heading>Artists</Heading>
            {data?.artists?.length > 5 && (
              <Link to={`/search_artists/${keyword}`} className="text-white">
                See All
              </Link>
            )}
          </div>
          <div className="grid grid-cols-5 gap-4">
            {data?.artists.slice(0, 5).map((artist) => (
              <ArtistCard idArtist={artist?._id} key={v4()}></ArtistCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
