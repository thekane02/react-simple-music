import axios from "api/axios";
import { getToken, saveToken } from "utils/auth";

export default function useRefreshToken() {
  const refresh = async () => {
    const { access_token, refresh_token } = getToken();
    if (access_token && refresh_token) return;
    const response = await axios.post(
      "/auth/refresh",
      {
        refreshToken: refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.data) return;
    saveToken(response.data.accessToken, response.data.refreshToken);
    return response.data.accessToken || "";
  };
  return refresh;
}
