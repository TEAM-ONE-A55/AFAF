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
      <h3>{userData.handle}</h3>
      <SetAvatar />
      <div className="profile-info-wrapper">
        <p>
          <b>Role: </b>
          {userData.role === "admin" ? (
            <span style={{ color: 'rgb(255, 82, 82)' }}>Admin</span>
          ) : (
            <span>User</span>
          )}
        </p>
        <p><b>Email: </b>{userData.email}</p>
        <p><b>Full name: </b>{userData.name}</p>
        <Bio />
      </div>
      <Logout />
    </div>
  );
}
