import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SimpleThread.css";
import Avatar from "../../../components/Avatar/Avatar";
import { getUserByHandle } from "../../../services/users.service";

export default function SimpleThread({ topic, topicLike, topicDislike }) {
  const { user, userData } = useContext(AppContext);

  const [author, setAuthor] = useState({
    username: "",
    avatar: "",
    createdOn: "",
    threads: [],
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(topic.author).then((snapshot) => {
      setAuthor({
        avatar: snapshot.val().avatar,
        username: snapshot.val().handle,
        createdOn: new Date(snapshot.val().createdOn).toLocaleDateString(),
        threads: snapshot.val().createdTopics && Object.keys(snapshot.val().createdTopics).length,
        role: snapshot.val().role,
        uid: snapshot.val().uid,
      });
    });
  }, [topic.author, author]);

  return (
    <>
      {author.username && (
        <div className="simple-thread-container">
          <span className="author-info">
            <Avatar
              onClick={() => navigate(`/profile/${author.username}`)}
              Width={"70px"}
              Height={"70px"}
              url={author.avatar}
            />
            <p>
              <b>Author: </b>
              <Link to={`/profile/${author.username}`}>@{author.username}</Link>
            </p>
            <p>
              <b>Role: </b>
              {author.role === "admin" ? (
                <span style={{ color: "pink" }}>{author.role}</span>
              ) : (
                author.role
              )}
            </p>
            <p>
              <b>Member since: </b>
              {author.createdOn}
            </p>
            <p>
              <b>Total threads: </b>
              {author.threads}
            </p>
          </span>
          <hr />
          <h3>{topic.title}</h3>
          {topic.content ? 
          (topic.type === 'post' ? <p>{topic.content}</p> : 
          <a href={topic.content} target="_blank" rel="noreferrer">{topic.content}</a>) : 
          <img src={topic.url} alt="Topic image is missing :(" />} 
          {/* {topic.content ? (
            <p>{topic.content}</p>
          ) : (
            <img src={topic.url} alt="Topic image is missing :(" />
          )} */}
          <p>
            {" "}
            <b>Created on: </b>
            {new Date (topic.createdOn).toLocaleString()}
          </p>
          {topic.likedBy &&
            (topic.likedBy.length === 1 ? (
              <p>{topic.likedBy.length} like</p>
            ) : (
              <p>{topic.likedBy.length} likes</p>
            ))}
          <p>
            {user && (
              <>
                <Button onClick={() => topicLike(userData.handle, topic.id)}>
                  Like
                </Button>
                <Button onClick={() => topicDislike(userData.handle, topic.id)}>
                  Dislike
                </Button>
                <NavLink to={`/single-thread/${topic.id}`}>View</NavLink>
                {userData.handle === topic.author && <NavLink to={`/edit-thread/${topic.id}`}>Edit</NavLink>}
              </>
            )}
          </p>
          {topic.commentedBy &&
            (topic.commentedBy.length === 1 ? (
              <p>{topic.commentedBy.length} comment</p>
            ) : (
              <p>{topic.commentedBy.length} comments</p>
            ))}
        </div>
      )}
    </>
  );
}

SimpleThread.propTypes = {
  topic: PropTypes.object.isRequired,
  topicLike: PropTypes.func,
  topicDislike: PropTypes.func,
};
