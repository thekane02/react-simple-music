import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "redux/apiRequest";
import Modal from "components/modal/Modal";
import { Button } from "components/button";
import { Label } from "components/label";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeadingOverView from "components/common/HeadingOverView";
import LayoutForm from "layout/LayoutForm";
import DataEmpty from "components/common/DataEmpty";
const { default: axios } = require("api/axios");

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
  // .min(8, "Your password must be at least 8 characters"),
});

const ListAdminPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin.admins?.allAdmins);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const handleCreateAdmin = async () => {
    const ad = {
      username: watch("username"),
      password: watch("password"),
      firstName: watch("firstName"),
      lastName: watch("lastName"),
    };
    try {
      // setTypeModal("form");
      await axios
        .post(`/admin/`, ad, {
          headers: {
            Authorization: `Bearer ${admin?.admin_token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setShowModal(false);
          setCount(count + 1);
        });
      console.log(admin);
    } catch (e) {
      alert(e);
    }
  };
  const handleResetPassword = async (id) => {
    const res = await axios.put(
      `/admin/${id}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${admin?.admin_token}`,
        },
      }
    );
    console.log(res);
  };
  console.log(watch("username"));
  useEffect(() => {
    getAllAdmins(admin?.admin_token, dispatch);
    console.log("hehe");
  }, []);
  useEffect(() => {
    getAllAdmins(admin?.admin_token, dispatch);
  }, [count]);
  localStorage.setItem("token", admin?.admin_token);
  return (
    <div className="">
      {list && list.length > 0 ? (
        <div>
          <HeadingOverView
            total={list && list.length}
            type="admins"
          ></HeadingOverView>
          <div className="flex-1">
            {list && list.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-base text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">First Name</th>
                    <th className="px-6 py-3">Last Name</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {list.map((ad) => (
                    <tr key={ad._id} className="bg-white border-b">
                      <td className="px-6 py-4">{ad.username || "Unknown"}</td>
                      <td className="px-6 py-4">{ad.firstName || "Unknown"}</td>
                      <td className="px-6 py-4">{ad.lastName || "Unknown"}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center gap-2 text-white">
                          <button
                            className="px-2 py-2 text-white bg-blue-500 rounded-md"
                            onClick={() => handleResetPassword(ad._id)}
                          >
                            Reset password
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nothing</p>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <Button
              onClick={() => {
                setShowModal(true);
                // setShowForm(!showForm);
              }}
            >
              Create Admin
            </Button>
          </div>
        </div>
      ) : (
        <DataEmpty msg="Not admins exist!" text="black"></DataEmpty>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm title="Create admin">
          <form
            onSubmit={handleSubmit(handleCreateAdmin)}
            className="w-[80%] px-24"
            autoComplete="off"
          >
            <div className="flex gap-3">
              <FormGroup className="w-[50%]">
                <Label htmlFor="firstName">First Name</Label>
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
              ></Input>
            </FormGroup>

            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </LayoutForm>
      </Modal>
    </div>
  );
};

export default ListAdminPage;
