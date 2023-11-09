import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "components/modal/Modal";

const { default: axios } = require("api/axios");

const ArtistTrackDetail = () => {
  const [track, setTrack] = useState({});
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [trackId, setTrackId] = useState(slug);

  const artist = useSelector((state) => state.auth.login?.currentUser);
  const [formDataUpdate, setFormDataUpdate] = useState({
    title: "",
    genre: "",
    release: "",
    isPublic: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý giá trị boolean của isPublic
    const inputValue = name === "isPublic" ? value === "true" : value;

    setFormDataUpdate((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    axios
      .get(`/artist/track/${slug}`, {
        headers: { Authorization: `Bearer ${artist?.data?.artist_token}` },
      })
      .then((response) => {
        const trackData = response.data;
        setTrack(trackData);
        setFormDataUpdate({
          title: trackData.title,
          genre: trackData.genre,
          release: trackData.release,
          isPublic: trackData.isPublic,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  const handleUpdateTrack = async (e) => {
    e.preventDefault();

    const trackDataUpdate = {
      title: formDataUpdate.title,
      genre: formDataUpdate.genre,
      release: formDataUpdate.release,
      isPublic: formDataUpdate.isPublic,
    };

    try {
      await axios.put(`/track/${trackId}`, trackDataUpdate, {
        headers: {
          Authorization: `Bearer ${artist?.data?.artist_token}`,
        },
      });
      alert("Track updated successfully!");
      setShowModal(false);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <label>Title</label> &nbsp;
      {track?.title}
      <br />
      <label>Public</label> &nbsp;
      {String(track.isPublic)}
      <br />
      <label>Genre</label> &nbsp;
      {track?.genre}
      <br />
      <label>Status</label> &nbsp;
      {String(track.status)}
      <br />
      <button onClick={() => setShowModal(true)}>Update Track</button>
      <Modal
        show={showModal}
        heading="Update Track"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleUpdateTrack}>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={formDataUpdate.title}
            onChange={handleInputChange}
          />
          <br />
          <label>Genre</label>
          <br />
          <input
            type="text"
            name="genre"
            value={formDataUpdate.genre}
            onChange={handleInputChange}
          />
          <br />
          <label>Release</label>
          <br />
          <input
            type="date"
            name="release"
            value={formDataUpdate.release}
            onChange={handleInputChange}
          />
          <br />
          <label>
            <input
              type="radio"
              name="isPublic"
              value={true}
              checked={formDataUpdate.isPublic === true}
              onChange={handleInputChange}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="isPublic"
              value={false}
              checked={formDataUpdate.isPublic === false}
              onChange={handleInputChange}
            />
            False
          </label>

          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ArtistTrackDetail;
