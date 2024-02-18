import { useContext, useEffect, useState } from "react";
import { getAllUsers, getUserByHandle } from "../../services/users.service";
import { Link, useNavigate } from "react-router-dom";
import { getAllTopics, getTopicById } from "../../services/threads.service";
import { blockUser, changeRole } from "../../functions/admin-functions";
import { deleteUser } from "../../services/users.service";
import { AppContext } from "../../context/AppContext";
import { deleteThread } from "../../functions/threads-functions";
import { sortThreads, sortUsers } from "../../functions/sorting-functions";
import "./Admin.css";
import toast from "react-hot-toast";
import SortingDropdown from "../../components/SortingDropdown/SortingDropdown";
import {
  threadsSortingOptions,
  usersSortingOptions,
} from "../../constants/constants";

export function Admin() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  const [topic, setTopic] = useState({});
  const [data, setData] = useState(false);
  const [usersSortBy, setUsersSortBy] = useState("dateDescending");
  const [threadSortBy, setThreadSortBy] = useState("dateDescending");

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => setUsers(userData));
  }, [user]);

  useEffect(() => {
    getAllTopics().then((topicData) => setTopics(topicData));
  }, []);

  useEffect(() => {}, [user]);

  useEffect(() => {}, [topic]);

  const getUser = async (handle) => {
    const user = await getUserByHandle(handle);
    const userData = user.val();
    setUser(userData);
  };

  const getTopic = async (id) => {
    getTopicById(id).then(setTopic);
  };

  const removeUser = async (user) => {
    await deleteUser(user);
    toast.promise(window.location.reload(), {
      loading: "Saving...",
      success: <b>{`User ${user} has been successfully deleted`}</b>,
      error: <b>Could not delete this user.</b>,
    });
  };

  const handleUsersSortChange = (sortBy) => {
    setUsersSortBy(sortBy);
  };

  const handleThreadsSortChange = (sortBy) => {
    setThreadSortBy(sortBy);
  };

  const handleDeleteThread = (topic) => {
    getTopic(topic.id);
    deleteThread(topic.author, topic.id, topic.uuid, topic.url);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="admin-container">
      {userData && userData.role === "admin" ? (
        <>
          <h2>Dashboard</h2>
          <hr />
          <br />
          <h3>Total users: {users.length}</h3>
          <h3>Total threads: {topics.length}</h3>
          <br />
          <h3 className="admin-data" onClick={() => setData(!data)}>
            {!data ? "See all users" : "See all threads"}
          </h3>
          <hr />
          {data ? (
            <>
              <h3>
                All users: {"  "}
                {
                  <SortingDropdown
                    options={usersSortingOptions}
                    defaultOption={usersSortBy}
                    onChange={handleUsersSortChange}
                  />
                }
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Date of registration</th>
                    <th>Total threads</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortUsers(users, usersSortBy).map((user) => {
                    return (
                      <tr key={user.handle}>
                        <td>{user.handle}</td>
                        <td>{user.name}</td>
                        <td>
                          {user.role === "admin" ? (
                            <span style={{ color: "pink" }}>{user.role}</span>
                          ) : (
                            user.role
                          )}
                        </td>
                        <td>{new Date(user.createdOn).toLocaleDateString()}</td>
                        <td>
                          {(user.createdTopics &&
                            Object.keys(user.createdTopics).length) ||
                            0}
                        </td>
                        <td>
                          {user.blocked === true ? (
                            <span style={{ color: "red" }}>Blocked</span>
                          ) : (
                            "Active"
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => navigate(`/profile/${user.handle}`)}
                          >
                            See Profile
                          </button>
                          <button
                            onClick={() => {
                              getUser(user.handle);
                              user.handle && removeUser(user.handle);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              getUser(user.handle);
                              blockUser(user, setUser);
                            }}
                          >
                            Ban
                          </button>
                          <button
                            onClick={() => {
                              getUser(user.handle);
                              changeRole(user, setUser);
                            }}
                          >
                            Change Role
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>
                All threads: {"  "}
                {
                  <SortingDropdown
                    options={threadsSortingOptions}
                    defaultOption={threadSortBy}
                    onChange={handleThreadsSortChange}
                  />
                }
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published on</th>
                    <th>Total likes</th>
                    <th>Total comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortThreads(topics, threadSortBy).map((topic) => (
                    <tr key={topic.id}>
                      <td
                        id="table-thread-title"
                        onClick={() => navigate(`/single-thread/${topic.id}`)}
                      >
                        {topic.title}
                      </td>
                      <td>
                        <Link to={`/profile/${topic.author}`}>
                          {topic.author}
                        </Link>
                      </td>
                      <td>{new Date(topic.createdOn).toLocaleString()}</td>
                      <td>{Object.keys(topic.likedBy).length}</td>
                      <td>{Object.keys(topic.commentedBy).length}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/single-thread/${topic.id}`)}
                        >
                          See Thread
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteThread(topic);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        navigate("*")
      )}
    </div>
  );
}
