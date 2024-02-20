import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dislikeTopic,
  getTopicById,
  likeTopic,
} from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { AppContext } from "../../../context/AppContext";
import Button from "../../../components/Button/Button";
import "./SingleThread.css";
import { deleteThread } from "../../../functions/threads-functions";
import Comment from "../../Comments/Comment/Comment";
import Comments from "../../Comments/RenderComments/RenderComments";
import { getUserByHandle } from "../../../services/users.service";
import Avatar from "../../../components/Avatar/Avatar";
import { avoidPropagation } from "../../../functions/other-functions";

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
  console.log(thread)

  useEffect(() => {
    // console.log('singlethread useeffect 1')
    getTopicById(id).then((result) => {
      if (result) {
        setThread(result);
      } else {
        navigate("*");
      }
    });
  }, []);

  useEffect(() => {
    // console.log('singlethread useeffect 2')
    if(thread) {getUserByHandle(thread.author).then((snapshot) => {
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
    })}
  }, [thread]);


  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getTopicById(id).then(setThread);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getTopicById(id).then(setThread);
  };

  return (
    <div className="single-thread-component-wrapper">
      {thread && (
        <>
        <div className="single-thread-container">
          <div className="single-thread-left-side">
              <Avatar
                onClick={e => avoidPropagation(e, () => {navigate(`/profile/${author.username}`)})}
                Width={"100px"}
                Height={"100px"}
                url={author.avatar}
              />
              <p className="single-thread-left-side-handle">
                <a onClick={e => avoidPropagation(e, () => {navigate(`/profile/${author.username}`)})}>@{author.username}</a>
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
            <div className="single-thread-right-side">
              <div className="single-thread-right-side-top">
                <h3>{thread.title}</h3>
                {thread.content ? 
                (thread.type === 'post' ? <p className="single-thread-content">{thread.content}</p> : 
                <a className="single-thread-url" href={thread.content} target="_blank" rel="noreferrer" onClick={e => avoidPropagation(e)}>{thread.content}</a>) : 
                <img className="single-thread-image" src={thread.url} alt="Topic image is missing :(" />} 
              </div>
              <div className="single-thread-right-side-bottom">
                <div>
                  {user && (
                    <div className="single-thread-like-wrapper">
                      <button onClick={e => avoidPropagation(e, topicLike(userData.handle, thread.id))}>
                        Like
                      </button>
                      {thread.likedBy &&
                        (thread.likedBy.length === 1 ? (
                          <p className="single-thread-like-count">{thread.likedBy.length} like</p>
                        ) : (
                          <p className="single-thread-like-count">{thread.likedBy.length} likes</p>
                        ))}
                      <button onClick={e => avoidPropagation(e, topicDislike(userData.handle, thread.id))}>
                        Dislike
                      </button>
                    </div>
                  )}
                </div>
                {thread.comments ?
                  (Object.keys(thread.comments).length === 1 ? (
                    <p>{Object.keys(thread.comments).length} comment</p>
                  ) : (
                    <p>{Object.keys(thread.comments).length} comments</p>
                    ))
                    : <p>0 comments</p>
                  }
                <span>
                  <b>Created: </b>
                  {new Date (thread.createdOn).toLocaleString()}
                </span>
                <div className="delete-edit-wrapper">
                  {userData && userData.handle === thread.author && <button className="edit-thread-button" onClick={e => avoidPropagation(e, navigate(`/edit-thread/${thread.id}`))}>Edit</button>}
                  {(userData?.handle === thread?.author || userData?.role === "admin") && (
                      thread && <button
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
            {thread.comments && <Comments thread={thread} setThread={setThread} />}
          </div>
        </>
      )}
    </div>
  );
}
