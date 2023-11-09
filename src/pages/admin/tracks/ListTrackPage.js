import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "redux/apiRequest";
import HeadingOverView from "components/common/HeadingOverView";
import IconApproveToggle from "components/icons/IconApproveToggle";
import PlayerV2 from "modules/player/PlayerV2";
import { IconBin, IconPlayToggle } from "components/icons";
import axios from "api/axios";
import { Button } from "components/button";
import Modal from "components/modal/Modal";
import LayoutForm from "layout/LayoutForm";
import ConfirmForm from "components/common/ConfirmForm";
import { toast } from "react-toastify";
import DataEmpty from "components/common/DataEmpty";

const ListTrackPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listTracks = useSelector((state) => state.track.tracks?.allTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(listTracks);
  const formatText = (str) =>
    str
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const handlePickTrack = (i) => {
    setIndex(i);
  };
  const hanldePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleApproveTrack = async () => {
    await axios
      .put(
        `/track/approved/${result[index]._id}`,
        { id: result[index]._id },
        {
          headers: { Authorization: `Bearer ${ad?.admin_token}` },
        }
      )
      .then((response) => toast.success(`Approved "${result[index].title}"`))
      .catch((error) => toast.error("Approve failed!"));
  };
  const handleDeleteTrack = async () => {
    await axios
      .delete(`/admin/track/${result[index]._id}`, {
        headers: { Authorization: `Bearer ${ad?.admin_token}` },
      })
      .then((response) => toast.success(`Approved "${result[index].title}"`))
      .catch((error) => toast.error("Delete failed!"));
  };
  console.log(index);
  useEffect(() => {
    getAllTracks(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.admin_token);
  const handleSearchTrack = (e) => {
    setResult(
      listTracks.filter((track) =>
        formatText(track.title).includes(formatText(e.target.value))
      )
    );
    console.log(result);
  };
  return (
    <>
      <HeadingOverView
        // imgUrl="/bg-3.jpg"
        total={listTracks && listTracks.length}
        type="tracks"
      ></HeadingOverView>
      <div className="flex gap-4">
        <div className="w-[60%] bg-bg-color overflow-auto h-[80vh] flex flex-col rounded-md">
          <div className="w-full p-4">
            <input
              className="w-full h-[40px] outline-none rounded-md text-base px-2"
              type="Enter text..."
              onChange={handleSearchTrack}
            />
          </div>
          <div
            className="flex flex-wrap gap-4 p-4 overflow-auto rounded-md "
            //   style={{
            //     backgroundImage: "url('/bg-3.jpg')",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //   }}
          >
            {result && result.length > 0 ? (
              result.map((item, i) => (
                <div
                  className={`flex items-center gap-2 p-2 bg-[rgba(255,255,255,0.9)] rounded-md cursor-pointer select-none border-2 ${
                    index === i ? "border-primary text-primary" : ""
                  }`}
                  key={item._id}
                  onClick={() => handlePickTrack(i)}
                >
                  <span onClick={hanldePlayPause}>
                    <IconPlayToggle
                      currentColor="black"
                      playing={index === i && isPlaying}
                    ></IconPlayToggle>
                  </span>
                  <h3>
                    {item.title} - {item.artist}
                  </h3>
                  <span>
                    <IconApproveToggle
                      size="18"
                      isPublic={item.status}
                    ></IconApproveToggle>
                  </span>
                </div>
              ))
            ) : (
              <DataEmpty text="Not songs exist!"></DataEmpty>
            )}
          </div>
        </div>
        <div className="items-center flex-1">
          <PlayerV2
            songs={result}
            index={index}
            handlePlayPause={hanldePlayPause}
            isPlaying={isPlaying}
            setAudioIndex={setIndex}
            setPlaying={setIsPlaying}
          >
            {result && result.length > 0 && (
              <div className="">
                <button
                  onClick={handleApproveTrack}
                  className={`px-4 py-2 text-white rounded-md min-w-[120px] my-2 font-semibold block text-lg ${
                    result[index]?.status
                      ? "bg-blue-400 text-gray-100"
                      : "bg-blue-500"
                  }`}
                  disabled={result[index]?.status}
                >
                  {result[index]?.status ? "Approved" : "Approve"}
                </button>
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
            )}
          </PlayerV2>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm>
          <ConfirmForm
            handleConfirm={() => {
              handleDeleteTrack();
              setShowModal(false);
            }}
            handleCancel={() => setShowModal(false)}
          ></ConfirmForm>
        </LayoutForm>
      </Modal>
    </>
  );
};

export default ListTrackPage;
