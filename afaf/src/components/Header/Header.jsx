import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import "./Header.css";

export default function Header() {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header>
      <span onClick={() => navigate("/")} className="logo-img">
        Logo
      </span>
      <input type="text" />
      {user ? (
        <span>
          <NavLink to="/profile">Profile</NavLink>
          <span>
            <Avatar
              Width="25px"
              Height="25px"
              url={userData.avatar}
              onClick={() => navigate("/profile")}
            />
          </span>
          <h4>Welcome, {userData && userData.handle}!</h4>
        </span>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <hr/>
    </header>
  );
}
