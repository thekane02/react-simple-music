import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { playPause, setPlaylist } from "redux/user/playerSlice";
import generateImg from "utils/generateImg";
import calculateTime from "utils/calculateTime";
import { IconBin, IconPlayToggle } from "components/icons";
import TrackItem from "modules/track/TrackItem";
import { v4 } from "uuid";
import Modal from "components/modal/Modal";
import LayoutForm from "layout/LayoutForm";
import ConfirmForm from "components/common/ConfirmForm";
import { toast } from "react-toastify";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const PlaylistDetailPage = () => {
  const axios = useAxiosPrivate();
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [song, setSong] = useState(null);
  const isPlay = useSelector((state) => state.player.issPlaying);
  const [type, setType] = useState(null);
  const handleDeletePlaylist = async () => {
    await axios
      .delete(`/playlist/${id}`)
      .then((response) => {
        console.log(response);
        toast.success(`Delelted "${data.title}"!`);
        navigate("/playlists");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete Failed!");
      });
  };
  const handleDeleteTrack = async (id) => {
    await axios
      .put(`/playlist/delete/${id}`, {})
      .then((response) => {
        console.log(response);
        toast.success(`Delelted "${song?.title}"!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete Failed!");
      });
  };
  useEffect(() => {
    const fetchAlbum = () => {
      axios.get(`/playlist/${id}`).then((res) => setData(res.data));
    };
    fetchAlbum();
  }, []);

  console.log(data);
  const handlePlayAlbum = () => {
    dispatch(setPlaylist(data.tracks));
    dispatch(playPause(!isPlay));
  };
  return (
    <div className="mt-20">
      {Object.keys(data).length === 0 ? (
        "Loading..."
      ) : (
        <div className="">
          <div className="flex gap-4">
            <div className="w-[290px] h-[290px]">
              <img
                className="object-cover w-full h-full rounded-md"
                src={
                  data.coverArtUrl
                    ? generateImg(data.coverArtUrl)
                    : "/thumb-5.avif"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 text-white">
              <h3 className="text-4xl font-semibold">
                {data.title || "Tomorow's tunes"}
              </h3>
              <p>{`${
                data.tracks.filter((track) => track !== null).length
              } songs - ${calculateTime(data.release)}`}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, aliquid dicta? Porro sapiente numquam odio a?
              </p>
              <div className="flex gap-4 mt-2">
                <div className="flex gap-3 rounded-full bg-alpha-bg w-[140px] p-2 items-center cursor-default select-none">
                  <span
                    className="cursor-pointer flex items-center justify-center rounded-full bg-primary w-[36px] h-[36px]"
                    onClick={handlePlayAlbum}
                  >
                    <IconPlayToggle></IconPlayToggle>
                  </span>
                  Play all
                </div>
                <div className="flex gap-3 rounded-full bg-alpha-bg w-[140px] p-2 items-center cursor-default select-none">
                  <span
                    className="cursor-pointer flex items-center justify-center rounded-full bg-red-500 w-[36px] h-[36px]"
                    onClick={() => {
                      setShowModal(true);
                      setType("playlist");
                    }}
                  >
                    <IconBin size={22} currentColor="white"></IconBin>
                  </span>
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            {data.tracks
              .filter((track) => track !== null)
              .map((track) =>
                track === null ? (
                  ""
                ) : (
                  <TrackItem key={v4()} song={track}>
                    <span
                      className="rounded-full opacity-0 cursor-pointer select-none p-2 group-hover:opacity-100 hover:bg-[rgba(0,0,0,0.2)]"
                      onClick={() => {
                        setSong(track);
                        setShowModal(true);
                        setType("track");
                      }}
                    >
                      <IconBin size={20} currentColor="white"></IconBin>
                    </span>
                  </TrackItem>
                )
              )}
          </div>
        </div>
      )}
      <Modal
        show={showModal}
        heading="Create Playlist"
        onClose={() => setShowModal(false)}
      >
        <LayoutForm>
          {type === "playlist" && (
            <ConfirmForm
              msg={`Are you sure you want to delete "${data?.title}"?`}
              handleConfirm={() => handleDeletePlaylist()}
              handleCancel={() => setShowModal(false)}
            ></ConfirmForm>
          )}
          {type === "track" && (
            <ConfirmForm
              msg={`Are you sure you want to delete "${song?.title}"?`}
              handleConfirm={() => {
                handleDeleteTrack(song?._id);
              }}
              handleCancel={() => setShowModal(false)}
            ></ConfirmForm>
          )}
        </LayoutForm>
      </Modal>
    </div>
  );
};

export default PlaylistDetailPage;
