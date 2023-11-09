import { Route, Routes, useNavigate } from "react-router-dom";
// import AdminHomePage from "pages/admin/admin/AdminHomePage";
// import ListAdminPage from "pages/admin/admin/ListAdminPage";
// import ListArtistPage from "pages/admin/artist/ListArtistPage";
// import ListTrackPage from "pages/admin/tracks/ListTrackPage";
// import TrackDetail from "pages/admin/tracks/TrackDetail";
// import ListPLaylistPage from "pages/admin/playlist/ListPlayListPage";
// import PlaylistDetail from "pages/admin/playlist/PlaylistDetail";
// import ListAlbumPage from "pages/admin/album/ListAlbum";
// import AlbumDetail from "pages/admin/album/AlbumDetail";
// import ListUserPage from "pages/admin/user/ListUser";
// import LoginPage from "pages/LoginPage";
// import AdminDashBoardPage from "pages/admin/AdminDashBoardPage";
import LayoutDashboard from "layout/LayoutDashboard";
import { useDispatch, useSelector } from "react-redux";
// import ArtistTrackPage from "pages/artist/track/ArtistTrackPage";
import LayoutSeleted from "layout/LayoutSeleted";
// import HomePage from "pages/user/HomePage";
// import AlbumDetailPage from "pages/user/AlbumDetailPage";
// import PlaylistPage from "pages/user/PlaylistPage";
// import ArtistDetailPage from "pages/user/ArtistDetailPage";
// import SongsFavoritePage from "pages/user/SongsFavoritePage";
// import SearchResultPage from "pages/user/SearchResultPage";
// import PlaylistDetailPage from "pages/user/PlaylistDetailPage";
// import ArtistHomePage from "pages/artist/artist/ArtistHomePage";
// import ArtistTrackDetail from "pages/artist/track/ArtistTrackDetail";
// import ArtistAlbumPage from "pages/artist/album/ArtistAlbumPage";
// import ArtistAlbumDetail from "pages/artist/album/ArtistAlbumDetail";
// import SubscribePage from "pages/user/SubscribePage";
// import SearchTracksResult from "pages/user/SearchTracksResult";
// import SearchArtistsResult from "pages/user/SearchArtistsResult";
// import SearchAlbumsResult from "pages/user/SearchAlbumsResult";
// import LoggerPage from "pages/admin/logger/LoggerPage";
import { Suspense, lazy, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { loginUser } from "redux/apiRequest";
import Test from "pages/Test";
import { getToken, logOut } from "utils/auth";
import { authRefreshToken, authUpdateCurrentUser } from "store/auth/auth-slice";
import Modal from "components/modal/Modal";
import ProfilePage from "pages/ProfilePage";
const AuthorizePage = lazy(() => import("pages/AuthorizePage"));
const RequiredAuthPage = lazy(() => import("pages/RequiredAuthPage"));

//Import admin pages
const AdminHomePage = lazy(() => import("pages/admin/admin/AdminHomePage"));
const ListAdminPage = lazy(() => import("pages/admin/admin/ListAdminPage"));
const ListArtistPage = lazy(() => import("pages/admin/artist/ListArtistPage"));
const ListTrackPage = lazy(() => import("pages/admin/tracks/ListTrackPage"));
const TrackDetail = lazy(() => import("pages/admin/tracks/TrackDetail"));
const ListPLaylistPage = lazy(() =>
  import("pages/admin/playlist/ListPlayListPage")
);
const PlaylistDetail = lazy(() =>
  import("pages/admin/playlist/PlaylistDetail")
);
const ListAlbumPage = lazy(() => import("pages/admin/album/ListAlbum"));
const AlbumDetail = lazy(() => import("pages/admin/album/AlbumDetail"));
const ListUserPage = lazy(() => import("pages/admin/user/ListUser"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const LoginPage2 = lazy(() => import("pages/LoginPage2"));
const AdminDashBoardPage = lazy(() => import("pages/admin/AdminDashBoardPage"));
const LoggerPage = lazy(() => import("pages/admin/logger/LoggerPage"));

//Import artist pages
const ArtistHomePage = lazy(() => import("pages/artist/artist/ArtistHomePage"));
const ArtistTrackPage = lazy(() =>
  import("pages/artist/track/ArtistTrackPage")
);
const ArtistTrackDetail = lazy(() =>
  import("pages/artist/track/ArtistTrackDetail")
);
const ArtistAlbumPage = lazy(() =>
  import("pages/artist/album/ArtistAlbumPage")
);
const ArtistAlbumDetail = lazy(() =>
  import("pages/artist/album/ArtistAlbumDetail")
);

//Import user pages
const HomePage = lazy(() => import("pages/user/HomePage"));
const AlbumDetailPage = lazy(() => import("pages/user/AlbumDetailPage"));
const PlaylistPage = lazy(() => import("pages/user/PlaylistPage"));
const ArtistDetailPage = lazy(() => import("pages/user/ArtistDetailPage"));
const SongsFavoritePage = lazy(() => import("pages/user/SongsFavoritePage"));
const SearchResultPage = lazy(() => import("pages/user/SearchResultPage"));
const PlaylistDetailPage = lazy(() => import("pages/user/PlaylistDetailPage"));
const SubscribePage = lazy(() => import("pages/user/SubscribePage"));
const SearchTracksResult = lazy(() => import("pages/user/SearchTracksResult"));
const SearchArtistsResult = lazy(() =>
  import("pages/user/SearchArtistsResult")
);
const SearchAlbumsResult = lazy(() => import("pages/user/SearchAlbumsResult"));

function App() {
  const role = useSelector((state) => state.auth?.currentUser?.roles[0]);
  const isLogin = useSelector(
    (state) => state.auth.currentUser?.roles.length > 0
  );
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (user && user.email) {
      const { access_token } = getToken();
      dispatch(
        authUpdateCurrentUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token, access_token } = getToken();
      if (refresh_token) {
        dispatch(
          authRefreshToken({
            accessToken: access_token,
            refreshToken: refresh_token,
          })
        );
      } else {
        dispatch(authUpdateCurrentUser({}));
        logOut();
      }
    }
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    // <Suspense fallback={<></>}>
    //   <Routes>
    //     <Route path="/test" element={<Test></Test>}></Route>
    //     <Route path="/auth" element={<LoginPage2></LoginPage2>}></Route>
    //     {!isLogin && (
    //       <Route path="/" exact element={<LoginPage2></LoginPage2>}></Route>
    //     )}
    //     <Route
    //       element={
    //         isLogin &&
    //         (role === "admin" || "artist") && (
    //           <LayoutDashboard></LayoutDashboard>
    //         )
    //       }
    //     >
    //       {role === "admin" && (
    //         <>
    //           <Route
    //             path="/"
    //             element={<AdminDashBoardPage></AdminDashBoardPage>}
    //           ></Route>
    //           <Route
    //             path="/admin"
    //             exact
    //             element={<AdminHomePage></AdminHomePage>}
    //           ></Route>
    //           <Route
    //             path="/admins"
    //             exact
    //             element={<ListAdminPage></ListAdminPage>}
    //           ></Route>
    //           <Route
    //             path="/artists"
    //             exact
    //             element={<ListArtistPage></ListArtistPage>}
    //           ></Route>
    //           <Route
    //             path="/tracks"
    //             exact
    //             element={<ListTrackPage></ListTrackPage>}
    //           ></Route>
    //           <Route
    //             path="/track/:slug"
    //             exact
    //             element={<TrackDetail></TrackDetail>}
    //           ></Route>
    //           <Route
    //             path="/playlists"
    //             exact
    //             element={<ListPLaylistPage></ListPLaylistPage>}
    //           ></Route>
    //           <Route
    //             path="/playlists/:slug"
    //             exact
    //             element={<PlaylistDetail></PlaylistDetail>}
    //           ></Route>
    //           <Route
    //             path="/albums"
    //             exact
    //             element={<ListAlbumPage></ListAlbumPage>}
    //           ></Route>
    //           <Route
    //             path="/albums/:slug"
    //             exact
    //             element={<AlbumDetail></AlbumDetail>}
    //           ></Route>
    //           <Route
    //             path="/users"
    //             exact
    //             element={<ListUserPage></ListUserPage>}
    //           ></Route>
    //           <Route
    //             path="/logger"
    //             exact
    //             element={<LoggerPage></LoggerPage>}
    //           ></Route>
    //         </>
    //       )}
    //       {role === "Artist" && (
    //         <>
    //           <Route
    //             path="/"
    //             exact
    //             element={<ArtistHomePage></ArtistHomePage>}
    //           ></Route>
    //           <Route
    //             path="/tracks"
    //             exact
    //             element={<ArtistTrackPage></ArtistTrackPage>}
    //           ></Route>
    //           <Route
    //             path="/tracks/:slug"
    //             exact
    //             element={<ArtistTrackDetail></ArtistTrackDetail>}
    //           ></Route>
    //           <Route
    //             path="/albums"
    //             exact
    //             element={<ArtistAlbumPage></ArtistAlbumPage>}
    //           ></Route>
    //           <Route
    //             path="/albums/:id"
    //             exact
    //             element={<ArtistAlbumDetail></ArtistAlbumDetail>}
    //           ></Route>
    //         </>
    //       )}
    //     </Route>
    //     <Route
    //       element={
    //         isLogin && role === "user" && <LayoutSeleted></LayoutSeleted>
    //       }
    //     >
    //       <>
    //         <Route path="/" exact element={<HomePage></HomePage>}></Route>
    //         <Route
    //           path="/albums/:id"
    //           extract
    //           element={<AlbumDetailPage></AlbumDetailPage>}
    //         ></Route>
    //         <Route
    //           path="/artists/:id"
    //           extract
    //           element={<ArtistDetailPage></ArtistDetailPage>}
    //         ></Route>
    //         <Route
    //           path="/playlists"
    //           exact
    //           element={<PlaylistPage></PlaylistPage>}
    //         ></Route>
    //         <Route
    //           path="/playlists/:id"
    //           extract
    //           element={<PlaylistDetailPage></PlaylistDetailPage>}
    //         ></Route>
    //         <Route
    //           path="/songs-favorite"
    //           exact
    //           element={<SongsFavoritePage></SongsFavoritePage>}
    //         ></Route>
    //         <Route
    //           path="/search/:keyword"
    //           extract
    //           element={<SearchResultPage></SearchResultPage>}
    //         ></Route>
    //         {/* <Route
    //           path="/search/:keyword"
    //           extract
    //           element={<SearchResultPage></SearchResultPage>}
    //         ></Route> */}
    //         <Route
    //           path="/search_tracks/:keyword"
    //           extract
    //           element={<SearchTracksResult></SearchTracksResult>}
    //         ></Route>
    //         <Route
    //           path="/search_artists/:keyword"
    //           extract
    //           element={<SearchArtistsResult></SearchArtistsResult>}
    //         ></Route>
    //         <Route
    //           path="/search_albums/:keyword"
    //           extract
    //           element={<SearchAlbumsResult></SearchAlbumsResult>}
    //         ></Route>
    //         <Route
    //           path="/subscribe"
    //           extract
    //           element={<SubscribePage></SubscribePage>}
    //         ></Route>
    //       </>
    //     </Route>
    //   </Routes>
    // </Suspense>
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage2></LoginPage2>}></Route>
        <Route path="/auth" element={<AuthorizePage></AuthorizePage>}></Route>
        <Route element={<LayoutSeleted></LayoutSeleted>}>
          <Route
            element={
              <RequiredAuthPage allowRoles={["user"]}></RequiredAuthPage>
            }
          >
            <Route path="/" exact element={<HomePage></HomePage>}></Route>
            <Route
              path="/albums/:id"
              extract
              element={<AlbumDetailPage></AlbumDetailPage>}
            ></Route>
            <Route
              path="/artists/:id"
              extract
              element={<ArtistDetailPage></ArtistDetailPage>}
            ></Route>
            <Route
              path="/playlists"
              exact
              element={<PlaylistPage></PlaylistPage>}
            ></Route>
            <Route
              path="/playlists/:id"
              extract
              element={<PlaylistDetailPage></PlaylistDetailPage>}
            ></Route>
            <Route
              path="/songs-favorite"
              exact
              element={<SongsFavoritePage></SongsFavoritePage>}
            ></Route>
            <Route
              path="/search/:keyword"
              extract
              element={<SearchResultPage></SearchResultPage>}
            ></Route>
            <Route
              path="/search_tracks/:keyword"
              extract
              element={<SearchTracksResult></SearchTracksResult>}
            ></Route>
            <Route
              path="/search_artists/:keyword"
              extract
              element={<SearchArtistsResult></SearchArtistsResult>}
            ></Route>
            <Route
              path="/search_albums/:keyword"
              extract
              element={<SearchAlbumsResult></SearchAlbumsResult>}
            ></Route>
            <Route
              path="/subscribe"
              extract
              element={<SubscribePage></SubscribePage>}
            ></Route>
            <Route
              path="/profile"
              element={<ProfilePage></ProfilePage>}
            ></Route>
          </Route>
        </Route>
        <Route
          element={<RequiredAuthPage allowRoles={["admin"]}></RequiredAuthPage>}
        >
          <Route
            element={
              <LayoutDashboard>
                <Route
                  path="/"
                  element={<AdminDashBoardPage></AdminDashBoardPage>}
                ></Route>
                <Route
                  path="/admin"
                  exact
                  element={<AdminHomePage></AdminHomePage>}
                ></Route>
                <Route
                  path="/admins"
                  exact
                  element={<ListAdminPage></ListAdminPage>}
                ></Route>
                <Route
                  path="/artists"
                  exact
                  element={<ListArtistPage></ListArtistPage>}
                ></Route>
                <Route
                  path="/tracks"
                  exact
                  element={<ListTrackPage></ListTrackPage>}
                ></Route>
                <Route
                  path="/track/:slug"
                  exact
                  element={<TrackDetail></TrackDetail>}
                ></Route>
                <Route
                  path="/playlists"
                  exact
                  element={<ListPLaylistPage></ListPLaylistPage>}
                ></Route>
                <Route
                  path="/playlists/:slug"
                  exact
                  element={<PlaylistDetail></PlaylistDetail>}
                ></Route>
                <Route
                  path="/albums"
                  exact
                  element={<ListAlbumPage></ListAlbumPage>}
                ></Route>
                <Route
                  path="/albums/:slug"
                  exact
                  element={<AlbumDetail></AlbumDetail>}
                ></Route>
                <Route
                  path="/users"
                  exact
                  element={<ListUserPage></ListUserPage>}
                ></Route>
                <Route
                  path="/logger"
                  exact
                  element={<LoggerPage></LoggerPage>}
                ></Route>
              </LayoutDashboard>
            }
          ></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
