import React, { useEffect, useState } from "react";
import { ButtonFollowArtist } from "components/button";
import { Link } from "react-router-dom";
import { followArtistToggle } from "redux/apiRequest";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const { default: axios } = require("api/axios");

const ArtistCard = ({ idArtist, onlyName = false }) => {
  const axios = useAxiosPrivate();
  const [artist, setArtist] = useState({});
  const [data, setData] = useState({});
  const [countFollower, setCountFollower] = useState(0);
  const getInfoArtist = async (id) => {
    try {
      const res = await axios.get(`/artist/artist/${id}`);
      console.log(res);
      setData(res.data);
      setArtist(res.data.artist);
      setCountFollower(res.data.artist.followers);
    } catch (err) {
      console.log(err);
    }
  };
  const followArtistToggle = async (idArtist, followed = false) => {
    console.log("aa");
    if (!followed) {
      await axios
        .put(`/user/follow/${idArtist}`, {})
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    } else {
      await axios
        .put(`/user/unfollow/${idArtist}`, {})
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getInfoArtist(idArtist);
  }, []);
  // console.log(artist);
  return (
    <div className="w-[250px] items-center flex flex-col justify-center text-white gap-y-1">
      <Link
        to={`/artists/${idArtist}`}
        className="relative block w-full overflow-hidden transition-all rounded-full cursor-pointer group"
      >
        <img
          className="w-full duration-500 linear group-hover:scale-110"
          src={artist.picture || "/avt.jpg"}
          alt=""
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center opacity-0 group-hover:opacity-100 duration-500 linear">
          <span className="p-2 border-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M237.66 178.34a8 8 0 0 1 0 11.32l-24 24a8 8 0 0 1-11.32-11.32L212.69 192h-11.75a72.12 72.12 0 0 1-58.59-30.15l-41.72-58.4A56.1 56.1 0 0 0 55.06 80H32a8 8 0 0 1 0-16h23.06a72.12 72.12 0 0 1 58.59 30.15l41.72 58.4A56.1 56.1 0 0 0 200.94 176h11.75l-10.35-10.34a8 8 0 0 1 11.32-11.32ZM143 107a8 8 0 0 0 11.16-1.86l1.2-1.67A56.1 56.1 0 0 1 200.94 80h11.75l-10.35 10.34a8 8 0 0 0 11.32 11.32l24-24a8 8 0 0 0 0-11.32l-24-24a8 8 0 0 0-11.32 11.32L212.69 64h-11.75a72.12 72.12 0 0 0-58.59 30.15l-1.2 1.67A8 8 0 0 0 143 107Zm-30 42a8 8 0 0 0-11.16 1.86l-1.2 1.67A56.1 56.1 0 0 1 55.06 176H32a8 8 0 0 0 0 16h23.06a72.12 72.12 0 0 0 58.59-30.15l1.2-1.67A8 8 0 0 0 113 149Z"
              />
            </svg>
          </span>
        </div>
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link to="#" className="font-semibold">
          {artist.nickName || `${artist.userName}`}
          {/* Mob */}
        </Link>
        {!onlyName && (
          <p className="text-sm font-semibold text-gray-300">
            {artist.followers
              ? `${artist.followers} followers`
              : "Become first follower"}
          </p>
        )}
        {!onlyName && (
          <ButtonFollowArtist
            onClick={() => {
              followArtistToggle(artist._id, data.followed)
                .then((res) => {
                  if (res.success) {
                    if (data.followed) {
                      setCountFollower(countFollower - 1); // Giảm giá trị countFollower nếu unfollow
                    } else {
                      setCountFollower(countFollower + 1); // Tăng giá trị countFollower nếu follow
                    }
                    setData((prevState) => ({
                      ...prevState,
                      followed: !prevState.followed,
                    })); // Toggle trạng thái follow/unfollow
                  }
                })
                .catch((err) => console.log(err));
            }}
            followed={data.followed}
            countFollower={countFollower}
          ></ButtonFollowArtist>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;
