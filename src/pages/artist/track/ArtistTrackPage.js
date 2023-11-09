import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/modal/Modal";
import { getAllTrackArtists } from "redux/apiRequest";
import PlayerV2 from "modules/player/PlayerV2";
import {
  IconBin,
  IconEdit,
  IconPlayToggle,
  IconUpload,
} from "components/icons";
import HeadingOverView from "components/common/HeadingOverView";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutForm from "layout/LayoutForm";
import FormGroup from "components/common/FormGroup";
import FileInput from "components/input/FileInput";
import { Label } from "components/label";
import { Input } from "components/input";
import DatePicker from "react-date-picker";
import FieldCheckboxes from "components/common/FieldCheckboxes";
import { Radio } from "components/checkbox";
import { Button } from "components/button";
import ConfirmForm from "components/common/ConfirmForm";
import { toast } from "react-toastify";
import DataEmpty from "components/common/DataEmpty";

const { default: axios } = require("api/axios");

const schema = yup.object({
  // username: yup.string().required("Please enter your username"),
  // password: yup.string().required("Please enter your password"),
  //.min(8, "Your password must be at least 8 characters"),
});

const ArtistTrackPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const token = useSelector((state) => state.auth.login.token);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const listTracks = useSelector(
    (state) => state.trackArtist.trackArtists?.allTrackArtists
  );
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    genre: "",
    release: "",
    isPublic: true,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(listTracks);
  const [action, setAction] = useState("");
  const [value, onChange] = useState(new Date());
  const [dataTrack, setDataTrack] = useState({});

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

  const handleUpdateTrack = async (id) => {
    const data = {
      title: watch("title"),
      genre: watch("genre"),
      release: value,
      isPublic: watch("isPublic") === "public",
    };
    await axios
      .put(`/track/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchTrack = (e) => {
    setResult(
      listTracks.filter((track) =>
        formatText(track.title).includes(formatText(e.target.value))
      )
    );
    console.log(result);
  };

  const handleDeleteTrack = async (id) => {
    await axios
      .delete(`/track/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  const handleUploadTrack = async (e) => {
    const trackData = new FormData();
    trackData.append("file", watch("file"));
    trackData.append("title", watch("title"));
    trackData.append("genre", watch("genre"));
    trackData.append("release", value);
    trackData.append("isPublic", watch("isPublic") === "public");
    await axios
      .post("/track", trackData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Track uploaded successfully!");
      })
      .catch((error) => toast.error(error));
  };
  useEffect(() => {
    getAllTrackArtists(token, dispatch);
  }, []);
  console.log(dataTrack);
  return (
    <>
      <HeadingOverView
        imgUrl="/bg-3.jpg"
        total={listTracks && listTracks.length}
        type="tracks"
      ></HeadingOverView>
      <div className="flex gap-4">
        <div className="w-[60%] bg-bg-color overflow-auto h-[80vh] flex flex-col rounded-md">
          <div className="flex justify-between w-full gap-2 p-4">
            <input
              className="w-[94%] h-[40px] outline-none rounded-md text-base px-2"
              type="Enter text..."
              onChange={handleSearchTrack}
            />
            <button
              onClick={() => {
                setShowModal(true);
                setAction("upload");
              }}
              className="p-[2px] bg-green-500 rounded-md flex-1"
            >
              <IconUpload size={36} color="white"></IconUpload>
            </button>
          </div>
          <div className="flex flex-wrap gap-4 p-4 overflow-auto rounded-md ">
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
                  <span
                    className="p-1 bg-red-600 rounded-full hover:bg-red-500"
                    onClick={() => {
                      setShowModal(true);
                      setAction("delete");
                    }}
                  >
                    <IconBin size="18" currentColor="white"></IconBin>
                  </span>
                </div>
              ))
            ) : (
              <DataEmpty msg="No songs exist"></DataEmpty>
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
            isFetching={true}
            role="Artist"
            otherFunction={setDataTrack}
          >
            {result && result.length > 0 && (
              <button
                onClick={() => {
                  setShowModal(true);
                  setAction("update");
                }}
                className={`px-4 py-2 text-white rounded-md min-w-[120px] my-2 font-semibold flex items-center text-lg bg-blue-500 gap-1`}
              >
                <IconEdit size={18} color="white"></IconEdit>
                Update
              </button>
            )}
          </PlayerV2>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {action === "delete" ? (
          <LayoutForm>
            <ConfirmForm
              msg={`Are you sure you want to delete "${listTracks[index]?.title}"?`}
              handleConfirm={() => handleDeleteTrack(listTracks[index]._id)}
              handleCancel={() => setShowModal(false)}
            ></ConfirmForm>
          </LayoutForm>
        ) : (
          <LayoutForm title={`${action} track`}>
            {action === "upload" && (
              <form
                onSubmit={handleSubmit(handleUploadTrack)}
                autoComplete="off"
                className="w-[60%]"
              >
                <FormGroup>
                  <FileInput
                    control={control}
                    name="file"
                    fileType="audio"
                  ></FileInput>
                </FormGroup>

                <div className="flex justify-between gap-4">
                  <FormGroup className="w-[60%]">
                    <Label>Title</Label>
                    <Input
                      name="title"
                      control={control}
                      placeholder="Enter title..."
                    ></Input>
                  </FormGroup>
                  <FormGroup className="flex-1">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      name="genre"
                      control={control}
                      placeholder="Enter genre..."
                    ></Input>
                  </FormGroup>
                </div>

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
                <div className="flex justify-center">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
            {action === "update" && result?.length > 0 && (
              <form
                onSubmit={handleSubmit(() =>
                  handleUpdateTrack(result[index]?._id)
                )}
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
                      defaultValue={result[index]?.title}
                    ></Input>
                  </FormGroup>
                  <FormGroup className="flex-1">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      name="genre"
                      control={control}
                      placeholder="Enter genre..."
                      defaultValue={result[index]?.genre}
                    ></Input>
                  </FormGroup>
                </div>

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
                <div className="flex justify-center">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          </LayoutForm>
        )}
      </Modal>
    </>
  );
};

export default ArtistTrackPage;
