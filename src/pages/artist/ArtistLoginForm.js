import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { IconEyeToggle } from "../../components/icons";
import { Button } from "../../components/button";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters"),
});
const ArtistLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    //e.preventDefault();
    const user = {
      username: watch("username"),
      password: watch("password"),
    };
    console.log(user);
    loginUser("arist", user, dispatch, navigate);
  };
  console.log(watch("username"));

  return (
    <div className="absolute z-10 flex flex-col items-center w-full">
      <form
        className="w-[70%]"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            placeholder="Enter your username..."
            control={control}
            error={errors.username?.message}
            className="focus:border-[#FA58B6] border-[#7A0BC0]"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            control={control}
            error={errors.password?.message}
            className="focus:border-[#FA58B6] border-[#7A0BC0]"
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleShowPassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default ArtistLoginForm;
