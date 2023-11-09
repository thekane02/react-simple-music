import DataEmpty from "components/common/DataEmpty";
import HeadingOverView from "components/common/HeadingOverView";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "redux/apiRequest";

const ListUserPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.users?.allUsers);
  useEffect(() => {
    getAllUsers(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.admin_token);
  return (
    <>
      <HeadingOverView
        // imgUrl="wallpaper-1.jpg"
        total={listUser && listUser?.length}
        type="users"
      ></HeadingOverView>
      {listUser && listUser?.length > 0 ? (
        <table className="w-full text-sm text-gray-500 rounded-md">
          <thead className="text-base text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 max-w-[100px]">User</th>
              <th className="px-6 py-3">Following</th>
              <th className="px-6 py-3">Playlist</th>
              <th className="px-6 py-3">Liked</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listUser.map((user) => (
              <tr key={user._id} className="bg-white border-b">
                <td className="px-6 py-4 max-w-[100px]">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 rounded-full"
                      src={user.picture}
                      alt=""
                    />
                    <div className="text-left">
                      <p className="text-base text-[#374151] font-bold">
                        {user.name}
                      </p>
                      <p className="text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-[#374151] font-bold">
                    {user.following.length}
                  </p>
                  <p>artist</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-[#374151] font-bold">
                    {user.playList.length}
                  </p>
                  <p>playlists</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-[#374151] font-bold">
                    {user.liked.length}
                  </p>
                  <p>tracks</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <DataEmpty text="black" msg="Not users exist!"></DataEmpty>
      )}
    </>
  );
};

export default ListUserPage;
