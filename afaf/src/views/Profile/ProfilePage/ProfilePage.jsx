import Logout from "../Logout/Logout";
import Bio from "../Bio/Bio";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SetAvatar from "../SetAvatar/SetAvatar";

export default function Profile() {
  const { userData } = useContext(AppContext);
  return (
    <div className="avatar-container">
      <SetAvatar />
      <h3>{userData.handle}</h3>
      <p>Email: {userData.email}</p>
      <p>Full name: {userData.name}</p>
      <Bio />
      <br />
      <Logout />
    </div>
  );
}
