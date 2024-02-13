import { useContext, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import Button from "../../../components/Button/Button";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import {updateUserData} from "../../../services/users.service";
import { uploadAvatar } from "../../../services/storage.service";

export default function SetAvatar() {
  const { userData } = useContext(AppContext);
  const [imgUpload, setImgUpload] = useState(userData.avatar);
  const [attachImg, setAttachImg] = useState(null);

  const uploadImg = async () => {
     const url = await uploadAvatar(attachImg, userData.handle, "avatar")
     setImgUpload(url)
     toast.success("Your image was successfully uploaded!");
     window.location.reload()
  }
   useEffect(() => {
    updateUserData(userData.handle, "avatar", imgUpload)
   }, [imgUpload])



  return (
    <>
      <Avatar
        Width="150px"
        Height="150px"
        url={userData.avatar}
        onClick={() => {}}
      />
      <input type="file" onChange={(e) => setAttachImg(e.target.files[0])} />
      <Button
        onClick={uploadImg}
      >
        Upload
      </Button>
    </>
  );
}
