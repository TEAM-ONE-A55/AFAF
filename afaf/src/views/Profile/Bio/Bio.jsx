import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { updateUserData } from "../../../services/users.service";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import "./Bio.css";

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
    <div className='bio-container'>
      <textarea
        name='profile-bio'
        id='profile-bio'
        cols='30'
        rows='10'
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder='Zombie ipsum brains reversus...'
      ></textarea>
    </div>
  );

  const updateButtonText = (inputText) => {
    return (
      <Button
        onClick={() => {
          updateBio(bio);
          setOnChange(false);
        }}
      >
        {inputText}
      </Button>
    );
  };

  const hasBio = (
    <>
      <p>
        <b>Update bio:</b>
      </p>
      {formBio}
      <br />
      <Button onClick={() => setOnChange(false)}>Back</Button>
      {updateButtonText("Save Changes")}
    </>
  );

  const missingBio = (
    <>
      <p>
        <b>Add bio: </b>
      </p>
      {formBio}
      <br />
      {updateButtonText("Publish")}
      <br />
    </>
  );

  return (
    <div className='profile-bio-wrapper'>
      {userData.bio ? (
        onChange ? (
          hasBio
        ) : (
          <>
            <p>
              <b>Bio</b>{" "}
              <Link
                className='register-now'
                onClick={handleEditLinkBio}
              >
                Edit
              </Link>
            </p>
            <p className='bio-info'>{userData.bio}</p>
            <br />
          </>
        )
      ) : (
        missingBio
      )}
    </div>
  );
}
