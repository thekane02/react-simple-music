import { loginStart, loginSuccess, loginFail, loginWithGG } from "./authSlice";
import {
  getAdminsFailed,
  getAdminsStart,
  getAdminsSuccess,
} from "./admin/adminSlice";
import {
  getArtistStart,
  getArtistSuccess,
  getArtistFailed,
} from "./admin/artistSlice";
import {
  getTrackStart,
  getTrackSuccess,
  getTrackFailed,
} from "./admin/trackSlice";
import {
  getPlaylistStart,
  getPlaylistSuccess,
  getPlaylistFailed,
} from "./admin/playlistSlice";
import {
  getAlbumsStart,
  getAlbumsSuccess,
  getAlbumsFailed,
} from "./admin/albumSlice";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
} from "./admin/userSlice";
import {
  getLoggersStart,
  getLoggersSuccess,
  getLoggersFailed,
} from "./admin/loggerSlice";
import {
  getHomePageFailed,
  getHomePageStart,
  getHomePageSuccess,
} from "./user/homePageSlice";
import {
  getSongsLikedFailed,
  getSongsLikedStart,
  getSongsLikedSuccess,
} from "./user/songsLikedSlice";
import {
  getTrackArtistFailed,
  getTrackArtistStart,
  getTrackArtistSuccess,
} from "./trackArtistSlice";
import {
  getAritstAlbumFailed,
  getArtistAlbumStart,
  getArtistAlbumSuccess,
} from "./albumArtistSlice";
import { toast } from "react-toastify";
// import axios from "axios";

// const api = process.env.REACT_APP_API;

const { default: axios } = require("api/axios");

// const dispatch = useDispatch();
// const navigate = useNavigate();
export const loginUser = async (dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = res.data;
    dispatch(loginSuccess(data));
    console.log(data);
    navigate("/");
  } catch (err) {
    toast.error("Login failed!");
    dispatch(loginFail());
  }
};

export const loginUserWithGoogle = async (credential, dispatch, navigate) => {
  try {
    const res = await axios.get(`/auth`, {
      token: credential,
    });
    dispatch(loginWithGG(res));
    navigate("/");
  } catch (err) {
    console.log(err);
  }
  // return data;
};

export const getAllAdmins = async (accessToken, dispatch) => {
  dispatch(getAdminsStart());
  try {
    const res = await axios.get(`/admin/admin`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getAdminsSuccess(res.data));
  } catch (err) {
    dispatch(getAdminsFailed());
  }
};

export const getAllArtist = async (accessToken, dispatch) => {
  dispatch(getArtistStart());
  try {
    const res = await axios.get(`/admin/artist`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getArtistSuccess(res.data));
  } catch (err) {
    dispatch(getArtistFailed());
  }
};

export const getAllTracks = async (accessToken, dispatch) => {
  dispatch(getTrackStart());
  try {
    const res = await axios.get(`/admin/track`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getTrackSuccess(res.data));
  } catch (err) {
    dispatch(getTrackFailed());
  }
};
export const getAllPlaylists = async (accessToken, dispatch) => {
  dispatch(getPlaylistStart());
  try {
    const res = await axios.get(`/admin/playlist`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getPlaylistSuccess(res.data));
  } catch (err) {
    dispatch(getPlaylistFailed());
  }
};

export const getAllAlbums = async (accessToken, dispatch) => {
  dispatch(getAlbumsStart());
  try {
    const res = await axios.get(`/admin/album`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getAlbumsSuccess(res.data));
  } catch (err) {
    dispatch(getAlbumsFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`/admin/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const getAllLoggers = async (accessToken, dispatch) => {
  dispatch(getLoggersStart());
  try {
    const res = await axios.get(`/admin/logger`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getLoggersSuccess(res.data));
  } catch (err) {
    dispatch(getLoggersFailed());
  }
};

export const getAllTrackArtists = async (accessToken, dispatch) => {
  dispatch(getTrackArtistStart());
  try {
    const res = await axios.get("/artist/track", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getTrackArtistSuccess(res.data));
  } catch (err) {
    dispatch(getTrackArtistFailed());
  }
};

export const getAllAlbumArtists = async (accessToken, dispatch) => {
  dispatch(getArtistAlbumStart());
  try {
    const res = await axios.get("/artist/album", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getArtistAlbumSuccess(res.data));
  } catch (err) {
    dispatch(getAritstAlbumFailed());
  }
};

export const getHomePage = async (accessToken, dispatch) => {
  try {
    dispatch(getHomePageStart());

    const res = await axios.get(`/home`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res);
    dispatch(getHomePageSuccess(res.data));
  } catch (err) {
    dispatch(getHomePageFailed());
  }
};

export const createPlaylistUser = async (namePlaylist, token) => {
  await axios
    .post(
      `/playlist`,
      {
        title: namePlaylist,
        tracks: JSON.stringify([]),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to create playlist");
    });
};

export const followArtistToggle = async (idArtist, token, followed = false) => {
  console.log("aa");
  if (!followed) {
    await axios
      .put(
        `/user/follow/${idArtist}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  } else {
    await axios
      .put(
        `/user/unfollow/${idArtist}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
};

export async function getSongsLiked(token, dispatch) {
  dispatch(getSongsLikedStart());
  await axios
    .get(`/user/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => dispatch(getSongsLikedSuccess(response.data)))
    .catch(dispatch(getSongsLikedFailed()));
}
