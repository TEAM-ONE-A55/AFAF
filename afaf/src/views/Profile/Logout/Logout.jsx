import { useContext } from "react";
import { logoutUser } from "../../../services/auth.service";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    setContext({ user: null, userData: null });
    navigate("/");
  };

  return (
    <button
      className='logout-button'
      onClick={logout}
    >
      Sign Out
    </button>
  );
}
