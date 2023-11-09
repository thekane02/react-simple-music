import DataEmpty from "components/common/DataEmpty";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ArtistCard from "modules/artist/ArtistCard";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const SubscribePage = () => {
  const [ids, setIds] = useState([]);
  const [following, setFollowing] = useState(null);
  const [artists, setArtists] = useState([]);
  const axios = useAxiosPrivate();

  const getArtistFollowings = useCallback(async () => {
    const response = await axios.get("/user");
    setFollowing(response.data.following);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfoArtist = useCallback(
    async (idArtist) => {
      const response = await axios.get(`/artist/artist/${idArtist}`);
      return response.data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (following !== null) {
      setIds(following);
    }
  }, [following]);

  useEffect(() => {
    async function fetchData() {
      await getArtistFollowings();
    }
    fetchData();
  }, [getArtistFollowings]);

  useEffect(() => {
    async function fetchData() {
      const artistss = await Promise.all(ids.map((id) => getInfoArtist(id)));
      setArtists(artistss);
    }
    fetchData();
  }, [ids, getInfoArtist]);

  console.log(artists);
  return (
    <>
      {artists && artists.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {artists.length > 0 &&
            artists.map((artist) => (
              <div key={v4()} className="p-4 bg-alpha-bg">
                <ArtistCard idArtist={artist.artist._id}></ArtistCard>
              </div>
            ))}
        </div>
      ) : (
        <DataEmpty msg="You haven't followed any artists yet!"></DataEmpty>
      )}
    </>
  );
};

export default SubscribePage;
{
  /* <div key={v4()}>
            <img
              src={
                artist.artist.profileImage
                  ? `${process.env.REACT_APP_API}/file/${artist.artist.profileImage}`
                  : "/avt.jpg"
              }
              alt=""
            />
          </div> */
}
