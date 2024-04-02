import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import "./Header.css";
import Search from "../Search/Search";
import LOGO from "../../../img/LOGO.png"

export default function Header() {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header>
      <span onClick={() => navigate("/")} className="logo-img">
        <img className="header-logo" src={LOGO} alt="logo" />
      </span>

      <Search />
      {user ? (
        <>
          <NavLink to="/create-thread" className="navlink">
            New Thread
          </NavLink>
          {userData && userData.role === "admin" && (
            <NavLink to="/admin" className="navlink admin-navlink m-subtr-left">
              Admin
            </NavLink>
          )}
          <NavLink to="/profile" className="navlink m-subtr-left">
            Profile
          </NavLink>
          <span className="header-avatar">
            <Avatar
              Width="38px"
              Height="38px"
              url={userData && userData.avatar}
              onClick={() => {
                navigate("/profile");
              }}
            />
          </span>
        </>
      ) : (
        <>
          <NavLink to="/create-thread" className="navlink">New Thread</NavLink>
          <NavLink to="/login" className="navlink m-subtr-left">Sign in</NavLink>
        </>
      )}
    </header>
  );
}
