import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "modules/login/LoginForm";

const RoleItem = ({ img, role, onClick, isActive }) => {
  return (
    <div
      className="w-[80px] h-[80px] cursor-pointer text-center"
      onClick={() => onClick(role, isActive)}
    >
      <img
        className={`w-full select-none rounded-md ${
          isActive
            ? "scale-150 opacity-100 border-2 border-white"
            : "opacity-80"
        } transition-all`}
        src={img}
        alt=""
      />
      <span className="font-medium">{role}</span>
    </div>
  );
};

const LoginPage = () => {
  const [role, setRole] = useState(null);

  const getRole = (role) => {
    setRole(role);
  };
  console.log("🚀 ~ file: LoginPage.js:13 ~ getRole ~ role:", role);
  return (
    <div
      className="p-2 min-h-[100vh] flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1138288769/photo/light-purple-defocused-blurred-motion-abstract-background.jpg?s=612x612&w=0&k=20&c=aBWnZHZBypJSrqrMwfQ5j6TL9Osw2XYrHFmWQp8lHZo=')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="min-h-[600px] flex relative max-w-[950.4px] w-full rounded-xl">
        <div
          className={`absolute z-[20] left-0 top-0 bottom-0 max-w-[480px] w-full bg-[#eee] flex flex-col justify-center items-center text-white rounded-xl shadow-shadow-1 ${
            role ? "" : "translate-x-[50%]"
          } transition-all`}
          style={{
            backgroundImage: "url('/bg-login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "75% 20%",
          }}
        >
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="" className="mb-8" />
          </Link>

          <p className="font-semibold text-md">Choose role:</p>
          <div className="flex items-center justify-around w-full h-[180px]">
            <RoleItem
              onClick={getRole}
              img="/admin.jpg"
              role="Admin"
              isActive={role === "Admin"}
            ></RoleItem>
            <RoleItem
              onClick={getRole}
              img="/artist.jpg"
              role="Artist"
              isActive={role === "Artist"}
            ></RoleItem>
            <RoleItem
              onClick={getRole}
              img="/user.jpg"
              role="User"
              isActive={role === "User"}
            ></RoleItem>
          </div>
        </div>
        <div
          className={`${
            role ? "translate-x-[98%] transition-all" : "opacity-0"
          } relative flex flex-col items-center bg-bg-color-2 justify-center max-w-[480px] w-full rounded-tr-xl rounded-br-xl overflow-hidden shadow-shadow-r`}
        >
          <img className="absolute top-0 right-0 " src="/UpWave.svg" alt="" />
          <h3 className="absolute inline-block text-4xl font-semibold text-white top-2">
            Sign In
          </h3>
          {/* {role === "Admin" && <LoginForm role={role}></LoginForm>} */}
          <LoginForm role={role}></LoginForm>
          <img className="absolute bottom-0 " src="/DownWave.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
