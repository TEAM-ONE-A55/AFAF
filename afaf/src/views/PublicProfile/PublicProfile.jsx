import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser, getUserByHandle } from "../../services/users.service";
import Avatar from "../../components/Avatar/Avatar";
import "./PublicProfile.css";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import {
  dislikeTopic,
  getTopicsByAuthor,
  likeTopic,
} from "../../services/threads.service";
import { blockUser, changeRole } from "../../functions/admin-functions";
import SimpleThread from "../Threads/SimpleThread/SimpleThread";
import SortingDropdown from "../../components/SortingDropdown/SortingDropdown";
import { userThreadsSortingOptions } from "../../constants/constants";
import { sortThreads } from "../../functions/sorting-functions";

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
    name: "",
  });

  const [topics, setTopics] = useState([]);
  const [hasTopics, setHasTopics] = useState(false);
  const [threadSortBy, setThreadSortBy] = useState("dateDescending");

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
        name: snapshot.val().name,
      });
    });
  }, [handle]);

  useEffect(() => {}, [topics]);

  useEffect(() => {
    getTopicsByAuthor(user.handle).then(setTopics);
  }, [hasTopics, user.handle]);

  const removeUser = async (handle) => {
    await deleteUser(handle);
    toast.success(`User ${handle} has been successfully deleted`);
    navigate(-1);
  };

  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getTopicsByAuthor(user.handle).then(setTopics);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getTopicsByAuthor(user.handle).then(setTopics);
  };

  const handleThreadsSortChange = (sortBy) => {
    setThreadSortBy(sortBy);
  };

  return (
    <div className="public-profile-container">
      {userData && userData.role === "admin" && (
        <>
          <Button onClick={() => blockUser(user, setUser)}>
            {" "}
            {!user.blocked ? "Ban user" : "Unblock user"}
          </Button>
          <Button onClick={() => removeUser(user.handle)}>Delete user</Button>
        </>
      )}
      <br />
      <hr />
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
        <b>Full name: </b>
        {user.name}
      </p>

      <p>
        <b>Member since: </b>
        {user.createdOn}
      </p>
      <p>
        <b>Bio: </b>
      </p>
      <p className="bio-info">{user.bio || "Nothing shared"}</p>
      <p>
        <b>Total threads: </b>
        {user.threads || "Nothing shared"}
      </p>
      <Link onClick={() => setHasTopics(!hasTopics)}>
        {" "}
        {hasTopics ? <h3>Hide all threads</h3> : <h3>Show all threads</h3>}
      </Link>
      {hasTopics && (
        <>
          <SortingDropdown
            options={userThreadsSortingOptions}
            defaultOption={threadSortBy}
            onChange={handleThreadsSortChange}
          />
          {sortThreads(topics, threadSortBy).map((topic) => (
            <SimpleThread
              key={topic.id}
              topic={topic}
              topicDislike={topicDislike}
              topicLike={topicLike}
            />
          ))}
        </>
      )}
    </div>
  );
}
