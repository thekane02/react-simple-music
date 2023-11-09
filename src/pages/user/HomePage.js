import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from "redux/apiRequest";
import AlbumItem from "modules/album/AlbumItem";
import AlbumGrid from "modules/album/AlbumGrid";
import TrackItem from "modules/track/TrackItem";
import { v4 } from "uuid";
import Slider from "modules/slider";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Heading from "components/common/Heading";

const HomePage = () => {
  // const data = useSelector((state) => state.homePage.homePage.data);
  const [data, setData] = useState({});
  console.log(data);
  const trackActive = useSelector((state) => state.player.trackActive);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/home").then((res) => setData(res.data));
  }, []);

  return (
    <div className="mb-player-height">
      <div className="mb-5">
        <Slider
          // data={[
          //   { coverArtUrl: "http://localhost:3006/thumb.png" },
          //   {
          //     coverArtUrl:
          //       "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/f/7/4/cf7424c71f6f72806c9f8f5cfcb84b40.jpg",
          //   },
          //   {
          //     coverArtUrl:
          //       "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/2/8/1/2/2812a6baea9e4102b2e0407582190ce9.jpg",
          //   },
          //   {
          //     coverArtUrl:
          //       "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/2/9/b/929bb6191ac64297205cb16561ab267f.jpg",
          //   },
          //   { coverArtUrl: "http://localhost:3006/thumb.png" },
          // ]}
          data={data?.NoFollowing?.randomAlbumsNF.map((album) => {
            return { coverArtUrl: album.coverArtUrl, id: album._id };
          })}
        ></Slider>
      </div>
      {/* {data.NoFollowing.randomAlbumsNF.map((album) => (
        <div>
          {Object.values(album).map((item) => (
            <div>{item}</div>
          ))}
        </div>
      ))} */}
      {/* <input type="text" name="" id="" onChange={handleOnChange} /> */}
      {/* <Player link={audioUrl}></Player> */}
      {data?.Following && data?.Following?.randomAlbums.length > 0 && (
        <div>
          <Heading>Random Albums(Following)</Heading>
          <AlbumGrid>
            {data?.Following?.randomAlbums.map((album) => (
              <AlbumItem
                textColor="white"
                key={v4()}
                id={album._id}
                title={album.title}
                thumb={album.coverArtUrl}
              ></AlbumItem>
            ))}
            {/* <AlbumItem></AlbumItem>
          <AlbumItem></AlbumItem>
          <AlbumItem></AlbumItem>
          <AlbumItem></AlbumItem> */}
          </AlbumGrid>
          {/* <MusicPlayer></MusicPlayer> */}
        </div>
      )}

      {data?.NoFollowing && (
        <div>
          <Heading>Random Albums</Heading>
          <AlbumGrid>
            {data?.NoFollowing?.randomAlbumsNF.map((album) => (
              <AlbumItem
                textColor="white"
                key={v4()}
                id={album._id}
                keyProp={album._id}
                title={album.title}
                thumb={album.coverArtUrl}
              ></AlbumItem>
            ))}
            {/* <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem> */}
          </AlbumGrid>
          {/* <MusicPlayer></MusicPlayer> */}
        </div>
      )}

      <div className="gap-10 xl:flex">
        {data?.Following?.randomTracks?.length > 0 && (
          <div className="xl:w-2/4">
            <Heading>Random Tracks(Following)</Heading>
            <div>
              {data?.Following?.randomTracks.map((track) => (
                <TrackItem key={v4()} song={track}></TrackItem>
              ))}
            </div>
          </div>
        )}
        <div className="xl:flex-1">
          <Heading>Random Tracks</Heading>
          <div className="">
            {data?.NoFollowing?.randomTracksNF.map((track) => (
              <TrackItem
                key={v4()}
                song={track}
                activeSong={track._id === trackActive?._id}
              ></TrackItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
