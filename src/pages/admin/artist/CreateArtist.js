import React, { useState } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
const { default: axios } = require("api/axios");

const CreateArtist = () => {
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickName, setNichName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleCreateAdmin = async (e) => {
    const artist = {
      username,
      password,
      firstName,
      lastName,
      nickName,
      dob,
      email,
      phone,
    };
    try {
      await axios
        .post(`/artist`, artist, {
          headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
        })
        .then((res) => {
          console.log(res);
        });
      console.log(artist);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateAdmin}>
        <label>Username</label>
        <br></br>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br></br>
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>First name</label>
        <br />
        <input
          type="text"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label>Last name</label>
        <br />
        <input
          type="text"
          name="lastName"
          onChange={(e) => setLasttName(e.target.value)}
        />
        <br />
        <label>Nickname</label>
        <br />
        <input
          type="text"
          name="nickName"
          onChange={(e) => setNichName(e.target.value)}
        />
        <br />
        <label>Dob</label>
        <br />
        <input
          type="date"
          name="dob"
          onChange={(e) => setDob(e.target.value)}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Phone number</label>
        <br />
        <input
          type="text"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateArtist;
