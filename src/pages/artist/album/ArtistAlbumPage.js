import { getAllAlbumArtists, getAllTrackArtists } from "redux/apiRequest";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/modal/Modal";
import { NavLink } from "react-router-dom";
import AlbumGrid from "modules/album/AlbumGrid";
import AlbumItem from "modules/album/AlbumItem";
import LayoutForm from "layout/LayoutForm";
import { v4 } from "uuid";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileInput from "components/input/FileInput";
import { Radio } from "components/checkbox";
import FieldCheckboxes from "components/common/FieldCheckboxes";
import { Button } from "components/button";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
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

const ArtistAlbumPage = () => {
  const [count, setCount] = useState(0);
  const [value, onChange] = useState(new Date());
  const token = useSelector((state) => state.auth.login.token);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const artist = useSelector((state) => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const listAlbum = useSelector(
    (state) => state.albumArtist.albumArtists?.allAlbumArtists
  );
  const listTrack = useSelector(
    (state) => state.trackArtist.trackArtists?.allTrackArtists
  );
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    genre: "",
    release: "",
    isPublic: true,
    tracks: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(listTrack);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý giá trị boolean của isPublic
    const inputValue = name === "isPublic" ? value === "true" : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: image,
    }));
  };

  useEffect(() => {
    getAllAlbumArtists(token, dispatch);
    // getAllTrackArtists(token, dispatch);
  }, [count]);

  const handleCreateAlbum = async (e) => {
    // e.preventDefault();

    const albumData = new FormData();
    // albumData.append("image", formData.image);
    // albumData.append("title", formData.title);
    // albumData.append("genre", formData.genre);
    // albumData.append("release", formData.release);
    // albumData.append("isPublic", formData.isPublic);
    // albumData.append(
    //   "tracks",
    //   JSON.stringify(selectedTracks.map((track) => track._id))
    // );
    albumData.append("image", watch("image"));
    albumData.append("title", watch("title"));
    albumData.append("genre", watch("genre"));
    albumData.append("release", value);
    albumData.append(
      "isPublic",
      JSON.stringify(watch("isPublic") === "public")
    );
    albumData.append(
      "tracks",
      JSON.stringify(selectedTracks.map((track) => track._id))
    );

    try {
      await axios.post("/album", albumData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Album created successfully!");
      setCount(count + 1);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create album. Please try again.");
    }
  };

  const handleTrackSearch = (e) => {
    // const term = e.target.value;
    // setSearchTerm(term);

    // if (term.trim() === "") {
    //   setSearchResults(listTrack);
    // } else {
    //   const filteredTracks = listTrack.filter((track) => {
    //     return track.title.toLowerCase().includes(term.toLowerCase());
    //   });

    //   setSearchResults(filteredTracks);
    // }
    setSearchResults(
      listTrack.filter((track) =>
        formatText(track.title).includes(formatText(e.target.value))
      )
    );
  };

  const handleAddTrack = (track) => {
    !selectedTracks.includes(track) &&
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

  return (
    <>
      <div>
        {/* {listAlbum &&
          listAlbum.map((item) => (
            <div key={item._id}>
              {item.title} &nbsp; {item.tracks} &nbsp;
              <button>
                <NavLink to={`/albums/${item._id}`}>Detail</NavLink>
              </button>
            </div>
          ))} */}
        <div className="max-h-[96vh] overflow-auto  rounded-lg pl-6 py-4 text-black ">
          <AlbumGrid>
            <div
              className="rounded-md text-white w-[250px] flex items-center justify-center p-4"
              style={{
                backgroundImage: "url('/bg-3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                onClick={() => setShowModal(true)}
                className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 text-lg font-semibold transition-all border-4 border-dashed cursor-pointer select-none hover:text-gray-200 min-h-[250px]"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                    >
                      <g strokeDasharray={12} strokeDashoffset={12}>
                        <path d="M12 7V17">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.8s"
                            dur="0.2s"
                            values="12;0"
                          />
                        </path>
                        <path d="M7 12H17">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.6s"
                            dur="0.2s"
                            values="12;0"
                          />
                        </path>
                      </g>
                      <path
                        strokeDasharray={60}
                        strokeDashoffset={60}
                        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.5s"
                          values="60;0"
                        />
                      </path>
                    </g>
                  </svg>
                </span>
                New Album
              </div>
            </div>
            {listAlbum &&
              listAlbum.map((item) => (
                <AlbumItem
                  key={v4()}
                  thumb={item.coverArtUrl}
                  size="250"
                  title={item.title}
                  id={item._id}
                ></AlbumItem>
              ))}
          </AlbumGrid>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <LayoutForm title="Create Album">
            <form
              onSubmit={handleSubmit(handleCreateAlbum)}
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
              <FormGroup>
                <FileInput control={control} name="image"></FileInput>
              </FormGroup>

              {/* <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              /> */}
              {/* <br />
              <label>Genre</label>
              <br />
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              />
              <br /> */}

              {/* <label>Release</label>
              <br />
              <input
                type="date"
                name="release"
                value={formData.release}
                onChange={handleInputChange}
              />
              <br /> */}

              {/* <label>
                <input
                  type="radio"
                  name="isPublic"
                  value={true}
                  checked={formData.isPublic === true}
                  onChange={handleInputChange}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="isPublic"
                  value={false}
                  checked={formData.isPublic === false}
                  onChange={handleInputChange}
                />
                False
              </label> */}
              <div className="flex justify-between gap-3">
                <FormGroup className="w-[50%]">
                  <Label htmlFor="">Release</Label>
                  <DatePicker
                    name="release"
                    onChange={onChange}
                    value={value}
                  />{" "}
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
                {/* <Label htmlFor="track">Search Tracks:</Label>
                <br />
                <input
                  type="text"
                  id="track"
                  name="track"
                  value={searchTerm}
                  onChange={handleTrackSearch}
                  className="input-text"
                />
                <br />
                <div>
                  <label>Selected Tracks:</label>
                  {renderSelectedTracks()}
                </div>
                <br />
                <ul>
                  {searchResults.map((track) => (
                    <li key={track._id}>
                      {track.title} &nbsp;
                      <button
                        type="button"
                        onClick={() => handleAddTrack(track)}
                      >
                        Add
                      </button>
                    </li>
                  ))}
                </ul> */}
                <FormGroup className="w-[60%]">
                  <Label>Your Tracks</Label>
                  <div className="flex flex-col p-2 border-2 rounded-xl hover:border-secondary border-primary h-[200px]">
                    <input
                      type="text"
                      id="track"
                      name="track"
                      // value={searchTerm}
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
              {/* <button type="submit">Submit</button> */}
              <Button type="submit">Create</Button>
            </form>
          </LayoutForm>
        </Modal>
      </div>
    </>
  );
};

export default ArtistAlbumPage;
