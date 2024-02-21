import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dislikeTopic,
  getTopicById,
  likeTopic,
  undoDislikeTopic,
  undoLikeTopic,
} from "../../../services/threads.service";
import { AppContext } from "../../../context/AppContext";
import "./SingleThread.css";
import { deleteThread } from "../../../functions/threads-functions";
import Comment from "../../Comments/Comment/Comment";
import Comments from "../../Comments/RenderComments/RenderComments";
import { getUserByHandle } from "../../../services/users.service";
import Avatar from "../../../components/Avatar/Avatar";
import { avoidPropagation } from "../../../functions/other-functions";
import {
  STYLE_VOTES_EMPTY,
  STYLE_VOTES_FILL,
} from "../../../constants/constants";

export default function SingleThread() {
  const { user, userData } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [author, setAuthor] = useState({
    username: "",
    avatar: "",
    createdOn: "",
    threads: [],
    role: "",
  });

  useEffect(() => {
    getTopicById(id).then((result) => {
      if (result) {
        setThread(result);
      } else {
        navigate("*");
      }
    });
  }, []);

  useEffect(() => {
    if (thread) {
      getUserByHandle(thread.author).then((snapshot) => {
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
    }
  }, [thread]);

  const toggleUpvotes = async (thread, handle) => {
    let updatedLikedBy = thread.likedBy.slice();
    let updatedDislikedBy = thread.dislikedBy.slice();

    if (updatedDislikedBy.includes(handle)) {
      await undoDislikeTopic(handle, thread.id);
      updatedDislikedBy = updatedDislikedBy.filter((u) => u !== handle);
    }

    if (updatedLikedBy.includes(handle)) {
      await undoLikeTopic(handle, thread.id);
      updatedLikedBy = updatedLikedBy.filter((u) => u !== handle);
    } else {
      await likeTopic(handle, thread.id);
      updatedLikedBy.push(handle);
    }

    setThread((prevThread) => {
      if (prevThread.id === thread.id) {
        return {
          ...prevThread,
          likedBy: updatedLikedBy,
          dislikedBy: updatedDislikedBy,
        };
      }
      return prevThread;
    });
  };

  const toggleDownVotes = async (thread, handle) => {
    let updatedLikedBy = thread.likedBy.slice();
    let updatedDislikedBy = thread.dislikedBy.slice();

    if (updatedLikedBy.includes(handle)) {
      await undoLikeTopic(handle, thread.id);
      updatedLikedBy = updatedLikedBy.filter((u) => u !== handle);
    }

    if (updatedDislikedBy.includes(handle)) {
      await undoDislikeTopic(handle, thread.id);
      updatedDislikedBy = updatedDislikedBy.filter((u) => u !== handle);
    } else {
      await dislikeTopic(handle, thread.id);
      updatedDislikedBy.push(handle);
    }

    setThread((prevThread) => {
      if (prevThread.id === thread.id) {
        return {
          ...prevThread,
          likedBy: updatedLikedBy,
          dislikedBy: updatedDislikedBy,
        };
      }
      return prevThread;
    });
  };

  const renderVotes = (likes, dislikes) => {
    if (!likes) likes = 0;
    if (!dislikes) dislikes = 0;
    return likes - dislikes;
  };

  return (
    <div className="single-thread-component-wrapper">
      {thread && (
        <>
          <div className="single-thread-container">
            <div className="single-thread-left-side">
              <Avatar
                onClick={(e) =>
                  avoidPropagation(e, () => {
                    navigate(`/profile/${author.username}`);
                  })
                }
                Width={"100px"}
                Height={"100px"}
                url={author.avatar}
              />
              <p className="single-thread-left-side-handle">
                <a
                  onClick={(e) =>
                    avoidPropagation(e, () => {
                      navigate(`/profile/${author.username}`);
                    })
                  }
                >
                  @{author.username}
                </a>
              </p>
              <p>
                <b>Role: </b>
                {author.role === "admin" ? (
                  <span style={{ color: "rgb(255, 82, 82)" }}>
                    {author.role}
                  </span>
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
            <div className="single-thread-right-side">
              <div className="single-thread-right-side-top">
                <h3>{thread.title}</h3>
                {thread.content ? (
                  thread.type === "post" ? (
                    <p className="single-thread-content">{thread.content}</p>
                  ) : (
                    <a
                      className="single-thread-url"
                      href={thread.content}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => avoidPropagation(e)}
                    >
                      {thread.content}
                    </a>
                  )
                ) : (
                  <img
                    className="single-thread-image"
                    src={thread.url}
                    alt="Topic image is missing :("
                  />
                )}
              </div>
              <div className="single-thread-right-side-bottom">
                <div>
                  {user && (
                    <div className="single-thread-like-wrapper">
                      {thread.likedBy.includes(userData.handle) ? (
                        <span
                          onClick={(e) =>
                            avoidPropagation(e, () =>
                              toggleUpvotes(thread, userData.handle)
                            )
                          }
                          className="material-symbols-outlined thumb-icon"
                          style={STYLE_VOTES_FILL}
                        >
                          thumb_up
                        </span>
                      ) : (
                        <span
                          onClick={(e) =>
                            avoidPropagation(e, () =>
                              toggleUpvotes(thread, userData.handle)
                            )
                          }
                          className="material-symbols-outlined thumb-icon"
                          style={STYLE_VOTES_EMPTY}
                        >
                          thumb_up
                        </span>
                      )}

                      {thread.likedBy && thread.dislikedBy && (
                        <p className="simple-thread-like-count">
                          {renderVotes(
                            thread.likedBy.length,
                            thread.dislikedBy.length
                          )}
                        </p>
                      )}

                      {thread.dislikedBy.includes(userData.handle) ? (
                        <span
                          onClick={(e) =>
                            avoidPropagation(e, () =>
                              toggleDownVotes(thread, userData.handle)
                            )
                          }
                          className="material-symbols-outlined thumb-icon"
                          style={STYLE_VOTES_FILL}
                        >
                          thumb_down
                        </span>
                      ) : (
                        <span
                          onClick={(e) =>
                            avoidPropagation(e, () =>
                              toggleDownVotes(thread, userData.handle)
                            )
                          }
                          className="material-symbols-outlined thumb-icon"
                          style={STYLE_VOTES_EMPTY}
                        >
                          thumb_down
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {thread.comments ? (
                  Object.keys(thread.comments).length === 1 ? (
                    <p>{Object.keys(thread.comments).length} comment</p>
                  ) : (
                    <p>{Object.keys(thread.comments).length} comments</p>
                  )
                ) : (
                  <p>0 comments</p>
                )}
                <span>
                  <b>Created: </b>
                  {new Date(thread.createdOn).toLocaleString()}
                </span>
                <div className="delete-edit-wrapper">
                  {userData && (userData.handle === thread.author || userData.role==="admin") && (
                    <button
                      className="edit-thread-button"
                      onClick={(e) =>
                        avoidPropagation(e, () => {
                          navigate(`/edit-thread/${thread.id}`);
                        })
                      }
                    >
                      Edit
                    </button>
                  )}
                  {(userData?.handle === thread?.author ||
                    userData?.role === "admin") &&
                    thread && (
                      <button
                        className="delete-thread-button"
                        onClick={() => {
                          deleteThread(
                            thread.author,
                            thread.id,
                            thread.uuid,
                            thread.url,
                            "Thread has been successfully deleted"
                          );
                          setTimeout(() => {
                            navigate(-1);
                          }, 1000);
                        }}
                      >
                        Delete Thread
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="single-thread-comment-section">
            <Comment thread={thread} setThread={setThread} />
            {thread.comments && (
              <Comments thread={thread} setThread={setThread} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
