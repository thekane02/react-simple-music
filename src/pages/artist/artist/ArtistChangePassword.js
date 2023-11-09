import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { default: axios } = require("api/axios");

const ArtistChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const handleChangePassword = async (e) => {
    const pass = {
      password,
      newPassword,
      confirmNewPassword,
    };
    try {
      await axios
        .put(`/artist/password/`, pass, {
          headers: {
            Authorization: `Bearer ${artist?.data?.artist_token}`,
          },
        })
        .then((response) => {
          console.log(response.message);
        });
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleChangePassword}>
        <label>Password</label>
        <br></br>
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>New Password</label>
        <br></br>
        <input
          type="text"
          name="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <label>Confirm Password</label>
        <br></br>
        <input
          type="text"
          name="confirmNewPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ArtistChangePassword;
