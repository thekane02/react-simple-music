import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Modal from "components/modal/Modal";
import { getAllTrackArtists } from "redux/apiRequest";
import PlayerV2 from "modules/player/PlayerV2";
import { IconBin, IconEdit, IconPlayToggle } from "components/icons";
import { v4 } from "uuid";
import calculateTime from "utils/calculateTime";
import HeadingOverView from "components/common/HeadingOverView";
import { Button } from "components/button";
import * as yup from "yup";
import LayoutForm from "layout/LayoutForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import FileInput from "components/input/FileInput";
import DatePicker from "react-date-picker";
import FieldCheckboxes from "components/common/FieldCheckboxes";
import { Radio } from "components/checkbox";
import { toast } from "react-toastify";

const { default: axios } = require("api/axios");
const schema = yup.object({
  // username: yup.string().required("Please enter your username"),
  // password: yup.string().required("Please enter your password"),
  //.min(8, "Your password must be at least 8 characters"),
});
const formatText = (str) =>
  str
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const ArtistAlbumDetail = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const [value, onChange] = useState(new Date());
  const [album, setAlbum] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const token = useSelector((state) => state.auth.login.token);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [action, setAction] = useState("");
  const [infoAlbum, setInfoAlbum] = useState(null);

  const listTrack = useSelector(
    (state) => state.trackArtist.trackArtists?.allTrackArtists
  );

  const [searchResults, setSearchResults] = useState(listTrack);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handlePickTrack = (i) => {
    setIndex(i);
  };
  const hanldePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDeleteAlbum = async () => {
    await axios
      .delete(`/album/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        toast.success("Deleted successfully!");
        navigate("/albums");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Deleted fail!");
      });
  };

  useEffect(() => {
    getAllTrackArtists(token, dispatch);
  }, [dispatch, artist]);

  useEffect(() => {
    axios
      .get(`/artist/album/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const albumData = response.data;
        setAlbum(albumData);

        setSelectedTracks(albumData.tracks || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateAlbum = async (e) => {
    const albumData = new FormData();
    albumData.append("image", watch("image"));
    albumData.append("title", watch("title"));
    albumData.append("genre", watch("genre"));
    albumData.append("release", value);
    albumData.append("isPublic", watch("isPublic") === "public");
    albumData.append(
      "tracks",
      JSON.stringify(selectedTracks.map((track) => track._id))
    );

    // try {
    await axios
      .put(`/album/${id}`, albumData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSelectedTracks(selectedTracks);

        toast.success("Album updated successfully!");
        window.location.reload();
        console.log(albumData);
      })
      .then((err) => toast.error("Failed to update album. Please try again!"));
  };

  const handleTrackSearch = (e) => {
    setSearchResults(
      listTrack.filter((track) =>
        formatText(track.title).includes(formatText(e.target.value))
      )
    );
  };

  const handleAddTrack = (track) => {
    setSelectedTracks((prevSelectedTracks) => [...prevSelectedTracks, track]);
  };

  const handleRemoveTrack = (track) => {
    setSelectedTracks((prevSelectedTracks) =>
      prevSelectedTracks.filter((t) => t._id !== track._id)
    );
  };

  const renderSelectedTracks = () => {
    return selectedTracks.map((track) => (
      <div
        className="p-1 bg-[rgba(255,255,255,0.4)] text-sm rounded-md flex gap-1 items-center cursor-default select-none"
        key={v4()}
      >
        {track.title}
        <span
          className="cursor-pointer select-none"
          onClick={() => handleRemoveTrack(track)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
            />
          </svg>
        </span>
      </div>
    ));
  };
  console.log(album);

  return (
    <div>
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
                  <p className="">Owner: {album.artist}</p>
                  <div className="flex gap-3 mt-2">
                    <Button
                      className="flex items-center justify-around gap-3 bg-blue-500"
                      onClick={() => {
                        setShowModal(true);
                        setAction("update");
                        setInfoAlbum(album);
                      }}
                    >
                      Update
                      <IconEdit size={22} color="white"></IconEdit>
                    </Button>
                    <Button
                      className="flex items-center justify-around gap-1 bg-red-500"
                      onClick={() => {
                        setShowModal(true);
                        setAction("delete");
                      }}
                    >
                      Delete
                      <IconBin size={22} currentColor="white"></IconBin>
                    </Button>
                  </div>
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
                role="Artist"
              ></PlayerV2>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm title={`${action} "${album.title}"`}>
          {action === "update" && (
            <form
              onSubmit={handleSubmit(handleUpdateAlbum)}
              autoComplete="off"
              className="w-[60%]"
            >
              <div className="flex justify-between gap-4">
                <FormGroup className="w-[60%]">
                  <Label>Title</Label>
                  <Input
                    name="title"
                    control={control}
                    placeholder="Enter title..."
                    defaultValue={album.title}
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    name="genre"
                    control={control}
                    placeholder="Enter genre..."
                    defaultValue={album.genre}
                  ></Input>
                </FormGroup>
              </div>
              <FormGroup>
                <FileInput control={control} name="image"></FileInput>
              </FormGroup>
              <div className="flex justify-between gap-3">
                <FormGroup className="w-[50%]">
                  <Label htmlFor="">Release</Label>
                  <DatePicker
                    name="release"
                    onChange={onChange}
                    value={value}
                  />
                </FormGroup>
                <div>
                  <Label>Status</Label>

                  <FieldCheckboxes className="flex-1">
                    <Radio
                      control={control}
                      name="isPublic"
                      checked={watch("isPublic") === "public"}
                      value="public"
                    >
                      Public
                    </Radio>
                    <Radio
                      checked={watch("isPublic") === "private"}
                      control={control}
                      name="isPublic"
                      value="private"
                    >
                      Private
                    </Radio>
                  </FieldCheckboxes>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <FormGroup className="w-[60%]">
                  <Label>Your Tracks</Label>
                  <div className="flex flex-col p-2 border-2 rounded-xl hover:border-secondary border-primary h-[200px]">
                    <input
                      type="text"
                      id="track"
                      name="track"
                      onChange={handleTrackSearch}
                      className="input-text my-1 h-[34px]"
                    />
                    <div className="flex flex-wrap gap-2 overflow-auto text-white">
                      {searchResults &&
                        searchResults.length > 0 &&
                        searchResults.map((track) => (
                          <span
                            onClick={() => handleAddTrack(track)}
                            className="p-1 bg-[rgba(255,255,255,0.4)] text-sm rounded-md cursor-pointer select-none"
                            key={v4()}
                          >
                            {track.title}
                          </span>
                        ))}
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label>Tracks Selected</Label>
                  <div className="p-2 text-white border-2 rounded-xl hover:border-secondary border-primary h-[200px] flex-col">
                    <div className="flex flex-wrap max-h-full gap-2 overflow-auto">
                      {renderSelectedTracks()}
                    </div>
                  </div>
                </FormGroup>
              </div>
              <div className="flex justify-center">
                <Button type="submit">Update</Button>
              </div>
            </form>
          )}
          {action === "delete" && (
            <div className="flex flex-col gap-4 text-white w-[60%] items-center">
              <p className="text-2xl font-semibold text-center">
                Are you sure?
              </p>
              <div className="flex gap-4">
                <Button className="bg-green-500" onClick={handleDeleteAlbum}>
                  ok
                </Button>
                <Button
                  className="bg-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </LayoutForm>
      </Modal>
    </div>
  );
};

export default ArtistAlbumDetail;
