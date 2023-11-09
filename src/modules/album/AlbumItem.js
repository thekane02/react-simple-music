import React from "react";
import "./Album.css";
import { Link } from "react-router-dom";

const AlbumItem = ({
  thumb,
  title,
  id,
  isPlaylist = false,
  size = "290",
  textColor = "black",
}) => {
  return (
    <div
      style={{
        width: `${size}px`,
      }}
    >
      <Link
        to={`/${!isPlaylist ? "albums" : "playlists"}/${id}`}
        className={`relative mb-1 cursor-pointer select-none group overflow-hidden block h-[${size}px] bg-[#eee] rounded-md`}
        style={{
          height: `${size}px`,
        }}
      >
        <img
          className={`duration-300 ease-out group-hover:scale-110 object-cover h-full w-full block`}
          src={
            thumb
              ? `${process.env.REACT_APP_API}/file/${thumb}`
              : "/thumb-5.avif"
          }
          alt=""
          loading="lazy"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 z-2 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
          </span>
        </div>
      </Link>
      <Link
        to={`/${!isPlaylist ? "albums" : "playlists"}/${id}`}
        className={`block overflow-hidden text-base font-semibold cursor-pointer whitespace-nowrap text-ellipsis`}
        style={{
          color: `${textColor}`,
        }}
      >
        {title || "Âm nhạc nạp vitamin tích cực cho bạn mỗi ngày"}
      </Link>
    </div>
  );
};

export default AlbumItem;
