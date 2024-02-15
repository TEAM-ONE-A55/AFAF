import Logout from "../Logout/Logout";
import Bio from "../Bio/Bio";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SetAvatar from "../SetAvatar/SetAvatar";
import "./ProfilePage.css";

export default function Profile() {
  const { userData } = useContext(AppContext);
  return (
    <div className="profile-container">
      <SetAvatar />
      <h3>{userData.handle}</h3>
      <p>Role: {userData.role}</p>
      <p>Email: {userData.email}</p>
      <p>Full name: {userData.name}</p>
      <Bio />
      <br />
      <Logout />
    </div>
  );
}
