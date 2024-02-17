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
    getTopicById(id).then(setThread);
  }, [id]);

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
              );
              setTimeout(() => {
                navigate(-1);
              }, 1000);
            }}
          >
            Delete
          </Button>
        )}

      {thread && (
        <SimpleThread
          topic={thread}
          topicDislike={topicDislike}
          topicLike={topicLike}
        />
      )}
    </div>
  );
}
