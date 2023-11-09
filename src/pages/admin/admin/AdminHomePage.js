import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin home page</h1>
      <button>
        <NavLink to={'/list-admin'}>Admin</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/list-artist'}>Artist</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/list-track'}>Track</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/playlist'}>Play list</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/album'}>Album</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/logger'}>Logger</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/user'}>User</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/admin/change-password'}>Change password</NavLink>
      </button>
      <br></br>
    </div>
  );
};

export default AdminHomePage;
