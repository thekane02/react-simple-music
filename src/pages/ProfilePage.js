import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  console.log("🚀 ~ file: ProfilePage.js:6 ~ ProfilePage ~ user:", user);
  return (
    <div>
      <img src={user.picture} alt="" />
    </div>
  );
};

export default ProfilePage;
