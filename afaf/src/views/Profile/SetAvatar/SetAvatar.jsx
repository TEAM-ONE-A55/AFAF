import { useContext, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import Button from "../../../components/Button/Button";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { updateUserData } from "../../../services/users.service";
import { uploadAvatar } from "../../../services/storage.service";
import { defaultAvatar } from "../../../constants/constants";

export default function SetAvatar() {
  const { userData } = useContext(AppContext);
  const [imgUpload, setImgUpload] = useState(userData.avatar);
  const [attachImg, setAttachImg] = useState(null);

  const uploadImg = async () => {
    const url = await uploadAvatar(attachImg, userData.handle, "avatar");
    setImgUpload(url);
    toast.promise(window.location.reload(), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  useEffect(() => {
    updateUserData(userData.handle, "avatar", imgUpload);
  }, [imgUpload, userData.handle]);


  const deleteAvatar = () => {
    setImgUpload(defaultAvatar);
    toast.promise(window.location.reload(), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <>
      <Avatar
        Width="150px"
        Height="150px"
        url={userData.avatar}
        onClick={() => {}}
      />
      <input type="file" onChange={(e) => setAttachImg(e.target.files[0])} />
      {attachImg ? (
        <Button onClick={uploadImg}>Upload</Button>
      ) : (
        <Button
          onClick={() =>
            toast.error("Please select a file to upload before proceeding.")
          }
        >
          Upload
        </Button>
      )}

      {userData.avatar !== defaultAvatar && (
        <Button onClick={deleteAvatar}>Delete</Button>
      )}
    </>
  );
}
