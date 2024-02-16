import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserByHandle, updateUserData } from "../../services/users.service";
import Avatar from "../../components/Avatar/Avatar";
import "./PublicProfile.css";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";

export default function PublicProfile() {
  const { userData } = useContext(AppContext);

  const [user, setUser] = useState({
    avatar: "",
    handle: "",
    bio: "",
    createdOn: "",
    threads: null,
    blocked: "",
    role: "",
  });

  const location = useLocation();
  const handle = location.pathname.split("/")[2];

  useEffect(() => {
    getUserByHandle(handle).then((snapshot) => {
      setUser({
        avatar: snapshot.val().avatar,
        handle: snapshot.val().handle,
        bio: snapshot.val().bio,
        createdOn: new Date(snapshot.val().createdOn).toLocaleDateString(),
        threads:
          snapshot.val().createdTopics &&
          Object.keys(snapshot.val().createdTopics).length,
        blocked: snapshot.val().blocked,
        role: snapshot.val().role,
      });
    });
  }, [handle]);

  const blockUser = async () => {
    if (user.blocked === false) {
      await updateUserData(user.handle, "blocked", true);
      setUser({ ...user, blocked: true });
      toast.success(`User has been successfully blocked.`);
    } else {
      await updateUserData(user.handle, "blocked", false);
      setUser({ ...user, blocked: false });
      toast.success(`User has been successfully unblocked.`);
    }
  };

  const changeRole = async () => {
    if (user.role === "user") {
      await updateUserData(user.handle, "role", "admin");
      setUser({ ...user, role: "admin" });
      toast.success(`User role has been changed to an Admin`)
    } else {
      await updateUserData(user.handle, "role", "user");
      setUser({ ...user, role: "user" });
      toast.success(`User role has been changed to a normal user`)
    }
  };

  

  return (
    <div className="public-profile-container">
      <Avatar
        Width="150px"
        Height="150px"
        url={user.avatar}
        onClick={() => {}}
      />
      <h3>@{user.handle}</h3>
      <p><b>Role: </b>{user.role === 'admin' ? <span style={{color: "pink"}}>{user.role}</span> : user.role }</p>
      <p>
        <b>Member since: </b>
        {user.createdOn}
      </p>
      <p>
        <b>Bio: </b>
        {user.bio || "Nothing shared"}
      </p>
      <p>
        <b>Total threads: </b>
        {user.threads || "Nothing shared"}
      </p>
      <p>See all threads: TODO</p>
      {userData && userData.role === "admin" && (
        <>
          <Button onClick={changeRole}>{ user.role === 'admin' ? 'Change role to User' : "Change role to Admin" }</Button>
          <Button onClick={blockUser}>
            {" "}
            {!user.blocked ? "Ban user" : "Unblock user"}
          </Button>
          <Button onClick={() => {}}>Delete user</Button>
        </>
      )}
    </div>
  );
}
