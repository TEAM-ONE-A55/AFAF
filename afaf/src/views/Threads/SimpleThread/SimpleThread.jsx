import "./SimpleThread.css";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { getUserByHandle } from "../../../services/users.service";
import { avoidPropagation } from "../../../functions/other-functions";
import Avatar from "../../../components/Avatar/Avatar";
import {
  dislikeTopic,
  likeTopic,
  undoDislikeTopic,
  undoLikeTopic,
} from "../../../services/threads.service";
import {
  STYLE_VOTES_EMPTY,
  STYLE_VOTES_FILL,
} from "../../../constants/constants";
import toast from "react-hot-toast";

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
  }, [topic.author, userData]);

  const toggleUpvotes = async () => {
    if (topic.likedBy.includes(userData.handle)) {
      await undoLikeTopic(userData.handle, topic.id);
    } else {
      await likeTopic(userData.handle, topic.id);
    }
    topicLike(userData.handle, topic.id);
  };

  const toggleDownVotes = async () => {
    if (topic.dislikedBy.includes(userData.handle)) {
      await undoDislikeTopic(userData.handle, topic.id);
    } else {
      await dislikeTopic(userData.handle, topic.id);
    }
    topicDislike(userData.handle, topic.id);
  };

  const renderVotes = (likes, dislikes) => {
    return likes - dislikes;
  };

  const isBlocked = () => {
    return toast.error(
      "Oops! You're Blocked: Rule Break Detected. Admin's put you on pause"
    );
  };

  return (
    <>
      {author.username && (
        <div
          className="simple-thread-container"
          style={{ cursor: "pointer" }}
          onClick={(e) =>
            userData.blocked === false
              ? avoidPropagation(e, () =>
                  navigate(`/single-thread/${topic.id}`)
                )
              : isBlocked()
          }
        >
          <div className="simple-thread-left-side">
            <Avatar
              onClick={(e) =>
                avoidPropagation(e, () =>
                  navigate(`/profile/${author.username}`)
                )
              }
              Width={"100px"}
              Height={"100px"}
              url={author.avatar}
            />
            <p className="simple-thread-left-side-handle">
              <a
                onClick={(e) =>
                  avoidPropagation(e, () =>
                    navigate(`/profile/${author.username}`)
                  )
                }
              >
                @{author.username}
              </a>
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
              {topic.content ? (
                topic.type === "post" ? (
                  <p className="simple-thread-content">{topic.content}</p>
                ) : (
                  <a
                    className="simple-thread-url"
                    href={topic.content}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => avoidPropagation(e)}
                  >
                    {topic.content}
                  </a>
                )
              ) : (
                <img
                  className="simple-thread-image"
                  src={topic.url}
                  alt="Topic image is missing :("
                />
              )}
            </div>
            <div className="simple-thread-right-side-bottom">
              <div>
                {user && userData.blocked === false ? (
                  <div className="simple-thread-like-wrapper">
                    {topic.likedBy.includes(userData.handle) ? (
                      <span
<<<<<<< HEAD
                        onClick={(e) =>
                          userData.blocked === false
                            ? avoidPropagation(e, toggleUpvotes)
                            : toast
                        }
                        className="material-symbols-outlined"
=======
                        onClick={(e) => avoidPropagation(e, toggleUpvotes)}
                        className="material-symbols-outlined thumb-icon"
>>>>>>> 497bffde44716f168dcecd78388fc2bee580c6df
                        style={STYLE_VOTES_FILL}
                      >
                        thumb_up
                      </span>
                    ) : (
                      <span
                        onClick={(e) => avoidPropagation(e, toggleUpvotes)}
                        className="material-symbols-outlined thumb-icon"
                        style={STYLE_VOTES_EMPTY}
                      >
                        thumb_up
                      </span>
                    )}
                    {topic.likedBy && topic.dislikedBy && (
                      <p className="simple-thread-like-count">
                        {renderVotes(
                          topic.likedBy.length,
                          topic.dislikedBy.length
                        )}
                      </p>
                    )}

                    {topic.dislikedBy.includes(userData.handle) ? (
                      <span
                        onClick={(e) => avoidPropagation(e, toggleDownVotes)}
                        className="material-symbols-outlined thumb-icon"
                        style={STYLE_VOTES_FILL}
                      >
                        thumb_down
                      </span>
                    ) : (
                      <span
                        onClick={(e) => avoidPropagation(e, toggleDownVotes)}
                        className="material-symbols-outlined thumb-icon"
                        style={STYLE_VOTES_EMPTY}
                      >
                        thumb_down
                      </span>
                    )}
                  </div>
                ) : (
                  topic.likedBy &&
                  topic.dislikedBy && (
                    <p className="simple-thread-like-count">
                      {renderVotes(
                        topic.likedBy.length,
                        topic.dislikedBy.length
                      ) === 1
                        ? "1 vote"
                        : `${renderVotes(
                            topic.likedBy.length,
                            topic.dislikedBy.length
                          )} votes`}
                    </p>
                  )
                )}
              </div>
              {topic.comments ? (
                Object.keys(topic.comments).length === 1 ? (
                  <p>{Object.keys(topic.comments).length} comment</p>
                ) : (
                  <p>{Object.keys(topic.comments).length} comments</p>
                )
              ) : (
                <p>0 comments</p>
              )}
              <span>
                <b>Created: </b>
                {new Date(topic.createdOn).toLocaleString()}
              </span>
              {userData && (userData.handle === topic.author || userData.role==="admin") && (
                <button
                  className="edit-thread-button"
                  onClick={(e) =>
                    avoidPropagation(e, () =>
                      navigate(`/edit-thread/${topic.id}`)
                    )
                  }
                >
                  Edit
                </button>
              )}
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
