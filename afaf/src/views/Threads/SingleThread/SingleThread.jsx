import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTopic,
  dislikeTopic,
  getTopicById,
  likeTopic,
} from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { deleteUserTopic } from "../../../services/users.service";
import toast from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import Button from "../../../components/Button/Button";
import "./SingleThread.css";
import { deleteThreadImage } from "../../../services/storage.service";

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

  const deleteThread = async (author, topic, uuid, url = "") => {
    try {
      await deleteUserTopic(author, topic);
      await deleteTopic(author, topic);
      if (url) {
        deleteThreadImage(uuid);
      }

      return toast.success("Your thread has been successfully deleted");
    } catch (e) {
      return toast.error("Something went wrong. Please try again later.");
    } finally {
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };

  return (
    <div className="single-thread-container">
      <h1>{thread?.title}</h1>
      {thread &&
        (userData?.handle === thread?.author || userData?.role === "admin") && (
          <Button
            onClick={() =>
              deleteThread(thread.author, thread.id, thread.uuid, thread.url)
            }
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
