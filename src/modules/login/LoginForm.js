import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, loginUserWithGoogle } from "redux/apiRequest";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { IconEyeToggle } from "components/icons";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
  //.min(8, "Your password must be at least 8 characters"),
});

const LoginForm = ({ role }) => {
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
  // const setAuthData = useStore((state) => state.setAuthData);
  const handleLogin = (e) => {
    const user = {
      username: watch("username"),
      password: watch("password"),
    };
    console.log(user);
    loginUser(role, user, dispatch, navigate);
  };
  console.log(watch("username"));

  return (
    <div className="absolute z-10 flex flex-col items-center w-full">
      {role === "User" ? (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            useOneTap={true}
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              // loginUserWithGoogle(
              //   credentialResponse.credential,
              //   dispatch,
              //   navigate
              // );
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      ) : (
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
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className="text-white" htmlFor="password">
              Password
            </Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              control={control}
              error={errors.password?.message}
              className="focus:border-[#FA58B6] border-[#7A0BC0] text-white"
            >
              <IconEyeToggle
                open={showPassword}
                onClick={handleShowPassword}
              ></IconEyeToggle>
            </Input>
          </FormGroup>
          <Button className="m-auto bg-primary-gradient" type="submit">
            Login
          </Button>
        </form>
      )}
      {/* {role === "User" && (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            useOneTap={true}
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const { data } = await axios.post(
                "http://localhost:3000/auth/login",
                {
                  // pass the token as part of the req body
                  token: credentialResponse.credential,
                }
              );
              localStorage.setItem("AuthData", JSON.stringify(data));
              console.log(data);
              setAuthData(data);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      )} */}
    </div>
  );
};

export default LoginForm;

// (
//   <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//     <GoogleLogin
//       useOneTap={true}
//       onSuccess={async (credentialResponse) => {
//         console.log(credentialResponse);
//         loginUserWithGoogle(
//           credentialResponse.credential,
//           dispatch,
//           navigate
//         );
//       }}
//       onError={() => {
//         console.log("Login Failed");
//       }}
//     />
//   </GoogleOAuthProvider>
// )
