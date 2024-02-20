import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
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
      const getUserData = snapshot.val();
      if (getUserData)
        setAuthor({
          avatar: snapshot.val().avatar,
          username: snapshot.val().handle,
          createdOn: new Date(snapshot.val().createdOn).toLocaleDateString(),
          threads:
            snapshot.val().createdTopics &&
            Object.keys(snapshot.val().createdTopics).length,
          role: snapshot.val().role,
          uid: snapshot.val().uid,
        });
    });
  }, [topic.author, author, userData]);


  const avoidPropagation = (event, func = () => {}) => {
    event.stopPropagation();
    func();
  }

  return (
    <>
      {author.username && (
        <div className="simple-thread-container" style={{ cursor: "pointer" }} onClick={e => avoidPropagation(e, navigate(`/single-thread/${topic.id}`))}>
          <div className="simple-thread-left-side">
            <Avatar
              onClick={e => avoidPropagation(e, navigate(`/profile/${author.username}`))}
              Width={"100px"}
              Height={"100px"}
              url={author.avatar}
            />
            <p className="simple-thread-left-side-handle">
              <a onClick={e => avoidPropagation(e, navigate(`/profile/${author.username}`))}>@{author.username}</a>
            </p>
            <p>
              <b>Role: </b>
              {author.role === "admin" ? (
                <span style={{ color: "rgb(255, 82, 82)" }}>{author.role}</span>
              ) : (
                author.role
              )}
            </p>
            <p>
              <b>Created threads: </b>
              {author.threads}
            </p>
            <p>
              <b>Member since: </b>
              {author.createdOn}
            </p>
          </div>
          <div className="simple-thread-right-side">
            <div className="simple-thread-right-side-top">
              <h3>{topic.title}</h3>
              {topic.content ? 
              (topic.type === 'post' ? <p className="simple-thread-content">{topic.content}</p> : 
              <a className="simple-thread-url" href={topic.content} target="_blank" rel="noreferrer" onClick={e => avoidPropagation(e)}>{topic.content}</a>) : 
              <img className="simple-thread-image" src={topic.url} alt="Topic image is missing :(" />} 
            </div>
            <div className="simple-thread-right-side-bottom">
              <div>
                {user && (
                  <div className="simple-thread-like-wrapper">
                    <button onClick={e => avoidPropagation(e, topicLike(userData.handle, topic.id))}>
                      Like
                    </button>
                    {topic.likedBy &&
                      (topic.likedBy.length === 1 ? (
                        <p className="simple-thread-like-count">{topic.likedBy.length} like</p>
                      ) : (
                        <p className="simple-thread-like-count">{topic.likedBy.length} likes</p>
                      ))}
                    <button onClick={e => avoidPropagation(e, topicDislike(userData.handle, topic.id))}>
                      Dislike
                    </button>
                  </div>
                )}
              </div>
              {topic.comments ?
                (Object.keys(topic.comments).length === 1 ? (
                  <p>{Object.keys(topic.comments).length} comment</p>
                ) : (
                  <p>{Object.keys(topic.comments).length} comments</p>
                  ))
                  : <p>0 comments</p>
                }
              <span>
                <b>Created: </b>
                {new Date (topic.createdOn).toLocaleString()}
              </span>
              {userData.handle === topic.author && <button className="edit-thread-button" onClick={e => avoidPropagation(e, navigate(`/edit-thread/${topic.id}`))}>Edit</button>}
            </div>
          </div>
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
