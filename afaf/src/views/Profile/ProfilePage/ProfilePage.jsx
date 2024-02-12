import Logout from "../Logout/Logout";
import Bio from "../Bio/Bio";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export default function Profile() {
  const { userData } = useContext(AppContext);
  return (
    <div>
      <h3>{userData.handle}</h3>
      <Bio />
      <br />
      <Logout />
    </div>
  );
}
