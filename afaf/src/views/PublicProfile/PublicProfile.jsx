import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser, getUserByHandle } from "../../services/users.service";
import Avatar from "../../components/Avatar/Avatar";
import "./PublicProfile.css";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { deleteTopic } from "../../services/threads.service";
import { blockUser, changeRole } from "../../functions/admin-functions";

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
  const navigate = useNavigate();

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

  const removeUser = async (handle) => {
    await deleteTopic(handle);
    await deleteUser(handle);
    toast.success(`User ${handle} has been successfully deleted`);
    navigate(-1);
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
      <p>
        <b>Role: </b>
        {user.role === "admin" ? (
          <span style={{ color: "pink" }}>{user.role}</span>
        ) : (
          user.role
        )}{" "}
        <span>
          <Link onClick={() => changeRole(user, setUser)}>
            {user.role === "admin" ? "Downgrade to User" : "Upgrade to Admin"}
          </Link>
        </span>
      </p>

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
          <Button onClick={() => blockUser(user, setUser)}>
            {" "}
            {!user.blocked ? "Ban user" : "Unblock user"}
          </Button>
          <Button onClick={() => removeUser(user.handle)}>Delete user</Button>
        </>
      )}
    </div>
  );
}
