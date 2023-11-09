import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import axios from "api/axios";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);
  return axios;
}
