import { Button } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import LayoutForm from "layout/LayoutForm";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModal, rerender } from "store/global/global-slice";

const CreatePlayListForm = ({ handleSubmit = () => {} }) => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const [namePlaylist, setNamePlaylist] = useState("");
  const createPlaylist = async (namePlaylist) => {
    await axios
      .post(`/playlist`, {
        title: namePlaylist,
        tracks: JSON.stringify([]),
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        dispatch(rerender());
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create playlist");
      });
  };
  return (
    <LayoutForm title="Create new playlist">
      <div className="flex flex-col w-full gap-2">
        <FormGroup>
          <Label>Name: </Label>
          <input
            type="text"
            name=""
            id=""
            className="input-text"
            onChange={(e) => setNamePlaylist(e.target.value)}
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={() => {
            createPlaylist(namePlaylist);
          }}
        >
          Create
        </Button>
      </div>
    </LayoutForm>
  );
};

export default CreatePlayListForm;
