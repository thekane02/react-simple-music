import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtist } from "redux/apiRequest";
import Modal from "components/modal/Modal";
import { Button } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeadingOverView from "components/common/HeadingOverView";
import LayoutForm from "layout/LayoutForm";
import DatePicker from "react-date-picker";
import { toast } from "react-toastify";
import ConfirmForm from "components/common/ConfirmForm";
import DataEmpty from "components/common/DataEmpty";
const { default: axios } = require("api/axios");

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter your email"),
  phone: yup.string().required("Please enter your phone number"),
});

const ListArtistPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listArtist = useSelector((state) => state.artist.artists?.allArtist);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [value, onChange] = useState(new Date());
  const [artist, setArtist] = useState(null);
  const [action, setAction] = useState("");

  const handleCreateAdmin = async (e) => {
    const artist = {
      username: watch("username"),
      password: watch("password"),
      firstName: watch("firstName"),
      lastName: watch("lastName"),
      nickName: watch("nickName"),
      dob: value,
      email: watch("email"),
      phone: watch("phone"),
    };
    await axios
      .post(`/artist`, artist, {
        headers: {
          Authorization: `Bearer ${admin?.admin_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setCount(count + 1);
        toast
          .success(`Created "${artist.username}" successfully!`)
          .catch((err) => toast.error("Create failed!"));
      });
  };
  const handlePay = async (artist) => {
    await axios
      .put(
        `/admin/payment/${artist._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${admin?.admin_token}`,
          },
        }
      )
      .then((res) => toast.success(`Successful payment to ${artist.nickName}`))
      .catch((err) => toast.error("Payment error"));
  };
  useEffect(() => {
    getAllArtist(admin?.admin_token, dispatch);
  }, [count]);
  localStorage.setItem("token", admin?.admin_token);
  const handleResetPassword = async (id) => {
    try {
      await axios.put(
        `/artist/reset/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${admin?.admin_token}`,
          },
        }
      );
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <HeadingOverView
        total={listArtist && listArtist?.length}
        type="artists"
      ></HeadingOverView>

      {listArtist && listArtist?.length > 0 ? (
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-base text-center text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 max-w-[100px]">Nick name</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {listArtist.map((artist) => (
                <tr key={artist._id} className="bg-white border-b">
                  <td className="px-6 py-4 max-w-[100px]">
                    <div className="flex items-center gap-3 ml-14">
                      <img
                        className="w-10 rounded-full"
                        src={
                          artist.profileImage
                            ? `${process.env.REACT_APP_API}/file/${artist.profileImage}`
                            : "/avt.jpg"
                        }
                        alt=""
                      />
                      <div className="text-left">
                        <p className="text-base text-[#374151] font-bold">
                          {artist.nickName || "Unknow"}
                        </p>
                        <p className="text-xs">{artist.username}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {artist.revenue.toFixed(2) || "0"}$
                    <button
                      className="px-2 py-1 ml-2 text-white bg-green-500 rounded-md"
                      onClick={() => {
                        setShowModal(true);
                        setArtist(artist);
                        setAction("pay");
                      }}
                    >
                      Pay Now
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-white">
                      <button
                        className="px-2 py-2 bg-blue-500 rounded-md"
                        onClick={() => handleResetPassword(artist._id)}
                      >
                        Reset password
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataEmpty msg="No artists exist" text="black"></DataEmpty>
      )}
      <div className="flex justify-end mt-5">
        <Button
          onClick={() => {
            setShowModal(true);
            setAction("");
          }}
        >
          Create Artist
        </Button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {action === "pay" ? (
          <LayoutForm>
            <ConfirmForm
              msg={`Are you sure you want to pay "${artist.nickName}"`}
              handleConfirm={() => {
                handlePay(artist);
                setShowModal(false);
              }}
              handleCancel={() => setShowModal(false)}
            ></ConfirmForm>
          </LayoutForm>
        ) : (
          <LayoutForm title="Create Artist">
            <form
              onSubmit={handleSubmit(handleCreateAdmin)}
              className="w-[80%] px-24"
              autoComplete="off"
            >
              <div className="flex gap-3">
                <FormGroup className="w-2/4">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    name="firstName"
                    placeholder="Enter your first name..."
                    control={control}
                    error={errors.firstName?.message}
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    name="lastName"
                    placeholder="Enter your last name..."
                    control={control}
                    error={errors.lastName?.message}
                  ></Input>
                </FormGroup>
              </div>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  placeholder="Enter your username..."
                  control={control}
                  error={errors.username?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  placeholder="Enter your password..."
                  control={control}
                  error={errors.password?.message}
                  type="password"
                ></Input>
              </FormGroup>

              <div className="flex gap-3">
                <FormGroup className="w-[60%]">
                  <Label htmlFor="nickName">Nick name</Label>
                  <Input
                    name="nickName"
                    placeholder="Enter your nick name..."
                    control={control}
                    error={errors.nickName?.message}
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="dob">Birthday</Label>
                  {/* <Input
                  type="date"
                  name="dob"
                  placeholder="Enter your birthday..."
                  control={control}
                  // error={errors.dob?.message}
                ></Input> */}
                  <DatePicker
                    name="dob"
                    control={control}
                    onChange={onChange}
                    value={value}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="Enter your email..."
                  control={control}
                  error={errors.email?.message}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  name="phone"
                  placeholder="Enter your phone number..."
                  control={control}
                  error={errors.phone?.message}
                ></Input>
              </FormGroup>
              <div className="flex justify-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </LayoutForm>
        )}
      </Modal>
    </>
  );
};

export default ListArtistPage;
