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

  return (
    <>
      <p>
        Bio: {userData.bio} <Link onClick={handleEditLinkBio}>Edit</Link>
      </p>
      {onChange && (
        <>
          <label htmlFor="profile-bio">New bio:</label>
          <br />
          <textarea
            name="profile-bio"
            id="profile-bio"
            cols="30"
            rows="10"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></textarea>
          <br />
          <Button onClick={() => setOnChange(false)}>Back</Button>
          <Button
            onClick={() => {
              updateBio(bio);
              setOnChange(false);
            }}
          >
            Save Changes
          </Button>
        </>
      )}
      <br />
    </>
  );
}
