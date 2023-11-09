import useSearch from "hooks/useSearch";
import { debounce } from "lodash";
import AlbumItem from "modules/album/AlbumItem";
import TrackItem from "modules/track/TrackItem";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 } from "uuid";

const LiveSearch = () => {
  const { setUrl, data } = useSearch("", {});
  const [keyWord, setKeyWord] = useState("");
  const resultRef = useRef();
  const inputRef = useRef();
  const location = useLocation();
  const handleOnchange = debounce((e) => {
    if (e.target.value !== "") {
      setUrl(`/search?keyword=${e.target.value}`);
      setKeyWord(e.target.value);
    } else setUrl("");
  }, 300);
  const handleOnClick = () => {
    if (inputRef.current.value !== "") {
      // Kiểm tra giá trị của input khác rỗng
      setUrl(`/search?keyword=${inputRef.current.value}`); // Chạy lại hàm setUrl
      setKeyWord(inputRef.current.value);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!resultRef.current.contains(e.target)) {
        setUrl("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setUrl("");
  }, [location.pathname]);
  console.log(data.tracks);
  return (
    <div className="relative flex items-center w-[440px]" ref={resultRef}>
      <input
        onClick={handleOnClick}
        ref={inputRef}
        className={`outline-none  w-full rounded-full h-full px-4 py-2 text-white pl-10 focus:bg-[#200437] ${
          typeof data !== "string" && Object.keys(data).length > 0
            ? "bg-[#200437]"
            : "bg-[hsla(0,0%,100%,0.1)]"
        }`}
        type="text"
        name=""
        id=""
        placeholder="Search..."
        onChange={handleOnchange}
      />
      <span className="absolute p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>

      {typeof data !== "string" && Object.keys(data).length > 0 && (
        <div
          className={`absolute left-0 right-0 bg-[#200437] top-full text-white rounded-b-xl h-auto px-4`}
        >
          <div className="w-6 h-6 bg-[#200437] absolute bottom-full left-0 -z-10"></div>
          <div className="w-6 h-6 bg-[#200437] absolute bottom-full right-0 -z-10"></div>
          {data?.tracks?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)]">
              {data.tracks.slice(0, 3).map((track) => (
                <TrackItem key={v4()} onlyTitle={true} song={track}></TrackItem>
              ))}
            </div>
          )}
          {data?.artists?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)] grid grid-cols-2 gap-2">
              {data.artists.slice(0, 4).map((artist) => (
                <Link
                  key={v4()}
                  to={`/artists/${artist._id}`}
                  className="flex items-center gap-2 p-2 hover:bg-alpha-bg"
                >
                  <img
                    className="rounded-md w-14 h-14"
                    src={
                      artist.profileImage
                        ? `${process.env.REACT_APP_API}/file/${artist.profileImage}`
                        : "/avt.jpg"
                    }
                    alt=""
                  />
                  <h3>{artist.nickName}</h3>
                </Link>
              ))}
            </div>
          )}
          {data?.albums?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)] grid grid-cols-5 py-2">
              {data.albums.slice(0, 5).map((album) => (
                <AlbumItem
                  textColor="white"
                  id={album._id}
                  title={album.title}
                  size="64"
                  key={v4()}
                ></AlbumItem>
              ))}
            </div>
          )}
          <div className="flex justify-center p-2">
            {" "}
            <Link
              to={`/search/${keyWord}`}
              className="inline-block px-20 py-2 text-center rounded-md bg-alpha-bg"
            >
              Show All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSearch;
