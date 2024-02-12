import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { updateUserData } from "../../../services/users.service";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

export default function Bio() {
  const { userData } = useContext(AppContext);
  const [bio, setBio] = useState("");
  const [onChange, setOnChange] = useState(false);

  const handleEditLinkBio = () => {
    return setOnChange(true);
  };

  const updateBio = async (newBio) => {
    await updateUserData(userData.handle, "bio", newBio);
    userData.bio = newBio;
    setBio("");
  };

  const formBio = (
    <>
      <textarea
        name="profile-bio"
        id="profile-bio"
        cols="30"
        rows="10"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder="Zombie ipsum brains reversus..."
      ></textarea>
    </>
  );

  const updateButtonText = (inputText) => {
    return <Button
    onClick={() => {
      updateBio(bio);
      setOnChange(false);
    }}
  >
    {inputText}
  </Button>
  }

  const hasBio = (
    <>
      <p>Update bio:</p>
      {formBio}
      <br />
      <Button onClick={() => setOnChange(false)}>Back</Button>
      {updateButtonText('Save Changes')}
    </>
  );

  const missingBio = (
    <>
      <p>Add bio: </p>
      {formBio}
     {updateButtonText('Publish')}
    </>
  );

  return (
    <>
      {userData.bio 
      ? (
        onChange 
          ? (
          hasBio
        ) : (
          <p>
            Bio: {userData.bio} <Link onClick={handleEditLinkBio}>Edit</Link>
          </p>
        )
      ) : (
        missingBio
      )}
    </>
  );
}
