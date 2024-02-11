import { useContext } from "react";
import Button from "../../components/Button/Button";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";

export default function Profile() {
  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    setContext({ user: null, userData: null });
    navigate("/");
  };
  return (
    <div>
      <h3>Profile</h3>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
