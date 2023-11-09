import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaylists } from "redux/apiRequest";
import { NavLink } from "react-router-dom";
import AlbumGrid from "modules/album/AlbumGrid";
import AlbumItem from "modules/album/AlbumItem";
import DataEmpty from "components/common/DataEmpty";

const ListPLaylistPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listPlaylist = useSelector(
    (state) => state.playlist.playlists?.allPlaylists
  );
  useEffect(() => {
    getAllPlaylists(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.admin_token);
  return (
    // <>
    //   <div>
    //     {listPlaylist &&
    //       listPlaylist.map((item) => (
    //         <div key={item._id}>
    //           {item.title}
    //           <button>
    //             <NavLink to={`/playlists/${item._id}`}>Detail</NavLink>
    //           </button>
    //         </div>
    //       ))}
    //   </div>
    //   {/* <LayoutModal
    //     heading="Playlist information"
    //     show={showModal}
    //     onClose={() => setShowModal(false)}
    //   >
    //     <p>Username: {ad.username}</p>
    //     <p>First Name: {ad.firstName}</p>
    //     <p>Last Name: {ad.lastName}</p>
    //     <button>Reset password</button>
    //   </LayoutModal> */}
    // </>
    <div className="max-h-[96vh] overflow-auto  rounded-lg pl-6 py-4 text-black ">
      <AlbumGrid>
        {listPlaylist && listPlaylist.length > 0 ? (
          listPlaylist.map((item) => (
            <AlbumItem
              isPlaylist={true}
              // thumb={`${item.picture}`}
              size="250"
              title={item.title}
              key={item._id}
              id={item._id}
            ></AlbumItem>
          ))
        ) : (
          <DataEmpty msg="Not playlists exist!" text="black"></DataEmpty>
        )}
      </AlbumGrid>
    </div>
  );
};

export default ListPLaylistPage;
