import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header>
      <span onClick={() => navigate("/")}>Logo</span>
      <input type="text" />
      {user ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <h4>Welcome, {userData && userData.handle}!</h4>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </header>
  );
}
