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
        <img className="header-logo" src="../../img/LOGO.png" alt="logo" />
      </span>
      <input type="text" />
      {user ? (
        <>
          <NavLink to="/create-thread">New Thread</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <span>
            <Avatar
              Width="40px"
              Height="40px"
              url={userData.avatar}
              onClick={() => navigate("/profile")}
            />
          </span>
        </>
      ) : (
        <>
          <NavLink to="/create-thread">New Thread</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>

      )}
    </header>
  );
}
