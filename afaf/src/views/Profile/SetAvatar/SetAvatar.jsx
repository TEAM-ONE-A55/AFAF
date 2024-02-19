import { useContext, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { updateUserData } from "../../../services/users.service";
import { deleteAvatar, uploadAvatar } from "../../../services/storage.service";
import { defaultAvatar } from "../../../constants/constants";

export default function SetAvatar() {
  const { userData, setContext } = useContext(AppContext);
  const [attachImg, setAttachImg] = useState(null);

  useEffect(() => {
    updateUserData(userData.handle, "avatar", userData.avatar);
  }, [userData]);

  const uploadImg = async () => {
    try {
      const url = await uploadAvatar(attachImg, userData.handle, "avatar");
      
      setContext(prevState => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          avatar: url
        }
      }));
      toast.success("Avatar uploaded successfully.");

    } catch (error) {
      console.log(error.message);
      toast.error("Could not upload avatar.");
    }
  };

  const deleteImg = () => {
    try {
      deleteAvatar(userData.handle, "avatar");

      setContext(prevState => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          avatar: defaultAvatar
        }
      }));
      toast.success("Avatar deleted successfully.");
      
    } catch (error) {
      console.log(error.message);
      toast.error("Could not delete avatar.");
    }
  };

  return (
    <div className="profile-avatar-wrapper">
      <Avatar
        Width="200px"
        Height="200px"
        url={userData.avatar}
        onClick={() => {}}
      />
      <input type="file" onChange={(e) => setAttachImg(e.target.files[0])} />
      {attachImg ? (
        <button onClick={uploadImg}>Upload</button>
      ) : (
        <button
          onClick={() =>
            toast.error("Please select a file to upload before proceeding.")
          }
        >
          Upload
        </button>
      )}

      {userData.avatar !== defaultAvatar && (
        <button onClick={deleteImg}>Delete</button>
      )}
    </div>
  );
}
