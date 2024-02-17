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
      <p>
        <b>Role: </b>
        {userData.role === "admin" ? (
          <span style={{ color: "pink" }}>{userData.role}</span>
        ) : (
          userData.role
        )}
      </p>
      <p><b>Email: </b>{userData.email}</p>
      <p><b>Full name: </b>{userData.name}</p>
      <Bio />
      <br />
      <Logout />
    </div>
  );
}
