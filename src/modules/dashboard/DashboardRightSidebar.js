import React, { useState } from "react";
import { IconLogout } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateInfoArtist } from "redux/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "components/modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "components/label";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { Button } from "components/button";
import LayoutForm from "layout/LayoutForm";
import { toast } from "react-toastify";
import FileInput from "components/input/FileInput";
import DatePicker from "react-date-picker";
import { v4 } from "uuid";
const { default: axios } = require("api/axios");

const schema = yup.object({
  // password: yup.string().required("Please enter your username"),
  // newPassword: yup.string().required("Please enter your password"),
  // confirmNewPassword: yup.string().required("Please enter your password"),
  // .min(8, "Your password must be at least 8 characters"),
});

const DashboardRightSidebar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login);
  const [showModal, setShowModal] = useState(false);
  const ad = useSelector((state) => state.auth.login?.currentUser);
  const role = useSelector((state) => state.auth.login.role);
  const infoArtist = useSelector((state) => state.auth.login?.currentUser);
  const [action, setAction] = useState("");
  const [value, onChange] = useState(infoArtist.dob);
  const [artistData, setArtistData] = useState(infoArtist);

  const handleChangePassword = async (e) => {
    const pass = {
      password: watch("password"),
      newPassword: watch("newPassword"),
      confirmNewPassword: watch("confirmNewPassword"),
    };
    await axios
      .put(`${role === "Admin" ? "/admin" : "/artist/password/"}`, pass, {
        headers: {
          Authorization: `Bearer ${
            role === "Admin" ? user?.currentUser.admin_token : user.token
          }`,
        },
      })
      .then((response) => {
        if (response.data.status === 400) toast.error(response.data.message);
        else toast.success(response.data.message);
        console.log(response);
      })
      .catch((err) => {
        toast.error("Change password failed!");
        console.log(err);
      });
  };

  const handleSocialLinkChange = (index, field, value) => {
    setArtistData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index][field] = value;
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
    });
  };

  const handleUpdateArtist = async () => {
    const formData = new FormData();
    formData.append("address", watch("address"));
    formData.append("genre", watch("genre"));
    formData.append("dob", value);
    formData.append("email", watch("email"));
    formData.append("phone", watch("phone"));
    formData.append("nickName", watch("nickName"));
    formData.append("firstName", watch("firstName"));
    formData.append("lastName", watch("lastName"));
    if (watch("image")) {
      formData.append("image", watch("image"));
    }

    formData.append(
      "socialLinks",
      JSON.stringify(
        artistData.socialLinks.filter(
          (item) => item.name !== "" && item.url !== ""
        )
      )
    );

    // console.log(artistData);
    await axios
      .put("/artist", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": artistData.image
            ? "multipart/form-data"
            : "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setShowModal(false);
        toast.success("Upate success!");
        dispatch(updateInfoArtist(response.data));
      })
      .catch((error) => toast.error("Update failed!"));

    // Update the artist data in the Redux store or perform any other necessary actions
    // ...
  };

  const handleAddSocialLink = () => {
    setArtistData((prevData) => ({
      ...prevData,
      socialLinks: [...prevData.socialLinks, { name: "", url: "" }],
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-between flex-1 flex-shrink-0 px-4 py-12 text-black border-l border-gray-400">
      <div>
        <div className="relative rounded-full w-[80px] m-auto">
          <img
            src={
              user.currentUser.profileImage
                ? `${process.env.REACT_APP_API}/file/${user.currentUser.profileImage}`
                : "/avt.jpg"
            }
            alt=""
            className="object-cover rounded-full  h-[80px] w-full"
          />
          <span className="absolute w-[20px] h-[20px] bg-green-500 block rounded-full border-2 border-white top-0 right-0"></span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {user.currentUser.nickName ? user.currentUser.nickName : "Unknown"}
          </h3>
          <p>{user.role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[52px]">
        {role === "Artist" && (
          <div className="font-semibold">
            <span
              onClick={() => {
                setShowModal(true);
                setAction("update");
              }}
              className="block p-4 bg-white rounded-full cursor-pointer shadow-[rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_2px_6px_2px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={19}
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M224 0a128 128 0 1 1 0 256a128 128 0 1 1 0-256zm-45.7 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5a48.1 48.1 0 1 0-96.1 0a48.1 48.1 0 1 0 96.1 0z"
                />
              </svg>
            </span>
          </div>
        )}
        <div className="font-semibold">
          <span
            onClick={() => {
              setShowModal(true);
              setAction("password");
            }}
            className="block p-4 bg-white rounded-full cursor-pointer shadow-[rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_2px_6px_2px]"
          >
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" />
            </svg>
          </span>
        </div>
        <div className="font-semibold">
          <span
            onClick={handleLogout}
            className="block p-4 bg-white rounded-full cursor-pointer shadow-[rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_2px_6px_2px]"
          >
            <IconLogout className=""></IconLogout>
          </span>
        </div>
        <span className="block p-4 bg-black rounded-full cursor-pointer">
          <svg
            className="fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
          </svg>
        </span>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm
          title={`${
            action === "password" ? "Change password" : "Update your info"
          }`}
        >
          {action === "password" && (
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="w-[70%] px-24"
              autoComplete="off"
            >
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  placeholder="Enter current password..."
                  control={control}
                  error={errors.password?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  name="newPassword"
                  placeholder="Enter new password..."
                  control={control}
                  error={errors.newPassword?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="confirmNewPassword">Comfirm new password</Label>
                <Input
                  name="confirmNewPassword"
                  placeholder="Confirm password..."
                  control={control}
                  error={errors.confirmNewPassword?.message}
                ></Input>
              </FormGroup>
              <div className="flex justify-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}
          {action === "update" && (
            <form
              onSubmit={handleSubmit(handleUpdateArtist)}
              autoComplete="off"
            >
              <FormGroup>
                <FileInput control={control} name="image"></FileInput>
              </FormGroup>
              <div className="flex justify-between gap-4">
                <FormGroup className="w-[50%]">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    control={control}
                    placeholder="Enter firt name..."
                    defaultValue={infoArtist.firstName}
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    name="lastName"
                    control={control}
                    defaultValue={infoArtist.lastName}
                    placeholder="Enter your last name..."
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex justify-between gap-4">
                <FormGroup className="w-[60%]">
                  <Label htmlFor="nickName">Nick name</Label>
                  <Input
                    name="nickName"
                    control={control}
                    defaultValue={infoArtist.nickName}
                    placeholder="Enter your nick name..."
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    name="genre"
                    control={control}
                    placeholder="Enter your genre..."
                    defaultValue={infoArtist.genre}
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex justify-between gap-3">
                <FormGroup className="w-[50%]">
                  <Label htmlFor="dob">Date of birthday</Label>
                  <DatePicker
                    name="dob"
                    control={control}
                    onChange={onChange}
                    value={value}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    name="phone"
                    control={control}
                    placeholder="Enter your phone number..."
                    defaultValue={infoArtist.phone}
                  ></Input>
                </FormGroup>
              </div>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  name="address"
                  control={control}
                  placeholder="Enter your address..."
                  defaultValue={infoArtist.address}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email address</Label>
                <Input
                  name="email"
                  control={control}
                  placeholder="Enter your email address..."
                  defaultValue={infoArtist.email}
                ></Input>
              </FormGroup>
              <div className="flex items-center justify-between mb-2">
                <Label>Socials</Label>
                <span
                  onClick={handleAddSocialLink}
                  className="rounded-md cursor-pointer bg-primary-gradient"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col h-[200px] p-1 border-2 border-primary rounded-md mb-5">
                <div className="flex flex-col h-full p-2 overflow-auto">
                  {artistData.socialLinks.map((link, index) => (
                    <div key={v4()} className="flex gap-3">
                      <FormGroup className="w-[30%]">
                        <Label>Name</Label>
                        <input
                          className="input-text"
                          type="text"
                          name={`socialName-${index}`}
                          value={link.name}
                          onChange={(e) =>
                            handleSocialLinkChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup className="flex-1">
                        <Label>Link</Label>
                        <input
                          className="input-text"
                          type="text"
                          name={`socialURL-${index}`}
                          value={link.url}
                          onChange={(e) =>
                            handleSocialLinkChange(index, "url", e.target.value)
                          }
                        />
                      </FormGroup>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit">Update</Button>
              </div>
            </form>
          )}
        </LayoutForm>
      </Modal>
    </div>
  );
};

export default DashboardRightSidebar;
