import Cookies from "js-cookie";
const accessTokenKey = "selected_access_token";
const refreshTokenKey = "selected_refresh_token";
const objCookies = {
  expires: 15 / (24 * 60),
  domain: process.env.REACT_APP_DOMAIN,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token);
    Cookies.set(refreshTokenKey, refresh_token);
    console.log("set cookie successfully!");
    console.log(process.env.REACT_APP_DOMAIN);
  } else {
    Cookies.remove(accessTokenKey);
    Cookies.remove(refreshTokenKey);
  }
};

export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);
  return {
    access_token,
    refresh_token,
  };
};
export const logOut = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey);
    Cookies.remove(refreshTokenKey);
  }
};
