import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { default: axios } = require("api/axios");

const AdminChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const handleChangePassword = async (e) => {
    const pass = {
      password,
      newPassword,
      confirmNewPassword,
    };
    try {
      await axios
        .put(`/admin`, pass, {
          headers: {
            Authorization: `Bearer ${ad?.data?.admin_token}`,
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

export default AdminChangePassword;
