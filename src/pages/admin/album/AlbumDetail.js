import { Button } from "components/button";
import ConfirmForm from "components/common/ConfirmForm";
import HeadingOverView from "components/common/HeadingOverView";
import { IconBin, IconPlayToggle } from "components/icons";
import Modal from "components/modal/Modal";
import LayoutForm from "layout/LayoutForm";
import PlayerV2 from "modules/player/PlayerV2";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import calculateTime from "utils/calculateTime";
import { v4 } from "uuid";

const { default: axios } = require("api/axios");

const AlbumDetail = () => {
  const [album, setAlbum] = useState({});
  const { slug } = useParams();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handlePickTrack = (i) => {
    setIndex(i);
  };
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const hanldePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleDeleteAlbum = async () => {
    await axios
      .delete(`/admin/album/${slug}`, {
        headers: { Authorization: `Bearer ${ad?.admin_token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success(`Deleted ${album.title}`);
        navigate("/albums");
      })
      .catch((error) => {
        toast.error(`Something went wrong!`);
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`/admin/album/${slug}`, {
        headers: { Authorization: `Bearer ${ad?.admin_token}` },
      })
      .then((response) => {
        setAlbum(response.data);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col h-[90vh] gap-4">
        <HeadingOverView
          total={album?.tracks?.length}
          imgUrl="/bg-3.jpg"
          type={`tracks`}
        ></HeadingOverView>
        <div className="flex flex-1 gap-6">
          <div className="min-h-[42vh] w-[60%] bg-white rounded-md relative">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 blur-sm brightness-75"
              style={{
                backgroundImage: `url('${process.env.REACT_APP_API}/file/${album.coverArtUrl}')`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex gap-4 p-4">
              <div className="w-[300px] text-white">
                <img
                  src={`${process.env.REACT_APP_API}/file/${album.coverArtUrl}`}
                  className="object-cover w-full rounded-lg h-[300px]"
                  alt=""
                />
                <div className="flex flex-col items-center p-2 text-center">
                  <h3 className="text-xl font-bold">{album.title}</h3>
                  <p className="">Release: {calculateTime(album.release)}</p>
                  <p className="mb-2">Owner: {album.artist}</p>
                  <Button
                    className="flex items-center justify-around gap-1 bg-red-500"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Delete
                    <IconBin size={22} currentColor="white"></IconBin>
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-[rgba(0,0,0,0.5)] text-white  rounded-md">
                {album?.tracks?.length > 0 ? (
                  album.tracks.map((item, i) => (
                    <div
                      onClick={() => handlePickTrack(i)}
                      key={v4()}
                      className={`${
                        index === i ? "bg-alpha-bg" : ""
                      } flex items-center gap-2 cursor-pointer w-full text-lg p-4`}
                    >
                      <span onClick={hanldePlayPause}>
                        <IconPlayToggle
                          playing={index === i && isPlaying}
                        ></IconPlayToggle>
                      </span>
                      {item.title}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No song exists</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            {Object.keys(album).length > 0 && (
              <PlayerV2
                setPlaying={setIsPlaying}
                handlePlayPause={hanldePlayPause}
                isPlaying={isPlaying}
                songs={album.tracks}
                index={index}
                setAudioIndex={setIndex}
              ></PlayerV2>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm>
          <ConfirmForm
            msg={`Are you sure you want to delete "${album.title}"?`}
            handleConfirm={() => handleDeleteAlbum()}
            handleCancel={() => setShowModal(false)}
          ></ConfirmForm>
        </LayoutForm>
      </Modal>
    </>
  );
};

export default AlbumDetail;
