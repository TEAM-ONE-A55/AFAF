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

export default function SingleThread() {
  const { userData } = useContext(AppContext);
  const [thread, setThread] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getTopicById(id).then(setThread);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getTopicById(id).then(setThread);
  };

  useEffect(() => {
    getTopicById(id).then((result) => {
      if (result) {
        setThread(result);
      } else {
        navigate("*");
      }
    });
  }, [id, navigate]);

  return (
    <div className="single-thread-container">
      <h1>{thread?.title}</h1>
      {thread &&
        (userData?.handle === thread?.author || userData?.role === "admin") && (
          <Button
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
            Delete thread
          </Button>
        )}

      {thread && (
        <>
          <SimpleThread
            topic={thread}
            topicDislike={topicDislike}
            topicLike={topicLike}
          />
          <Comment thread={thread} setThread={setThread} />
          {thread.comments && <Comments thread={thread} />}
        </>
      )}
    </div>
  );
}
