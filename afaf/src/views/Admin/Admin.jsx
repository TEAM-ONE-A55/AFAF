import { useContext, useEffect, useState } from "react";
import { getAllUsers, getUserByHandle } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { getAllTopics } from "../../services/threads.service";
import { blockUser, changeRole } from "../../functions/admin-functions";
import { deleteUser } from "../../services/users.service";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

export function Admin() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
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

  const getUser = async (handle) => {
    const user = await getUserByHandle(handle);
    const userData = user.val();
    setUser(userData);
  };

  const removeUser = async (user) => {
    await deleteUser(user);
    toast.promise(window.location.reload(), {
      loading: "Saving...",
      success: <b>{`User ${user} has been successfully deleted`}</b>,
      error: <b>Could not delete this user.</b>,
    });
  };

  return (
    <div className="admin-container">
      {userData && userData.role === "admin" ? (
        <>
          <h3>Dashboard</h3>
          <hr />
          <br />
          <h4>Total users</h4>

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
              {users.map((user) => {
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
                    <td>{user.createdTopics && Object.keys(user.createdTopics).length || 0}</td>
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

          <h4>Total threads</h4>

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
              {topics
                .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                .map((topic) => (
                  <tr key={topic.id}>
                    <td id="table-thread-title" onClick={() => navigate(`/single-thread/${topic.id}`)}>
                      {topic.title}
                    </td>
                    <td>{topic.author}</td>
                    <td>{new Date(topic.createdOn).toLocaleString()}</td>
                    <td>{Object.keys(topic.likedBy).length}</td>
                    <td>{Object.keys(topic.commentedBy).length}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        navigate('*')
      )}
    </div>
  );
}
