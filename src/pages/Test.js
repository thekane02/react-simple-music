import Cookies from "js-cookie";
import React from "react";
import { saveToken } from "utils/auth";

const Test = () => {
  const setValue = () => {
    Cookies.set("test", "baka");
    console.log("clicked");
    saveToken("hjh", "test");
  };
  return <div onClick={() => setValue()}>Test cookie</div>;
};

export default Test;
