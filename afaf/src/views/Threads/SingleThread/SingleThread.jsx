import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  dislikeTopic,
  getTopicById,
  likeTopic,
} from "../../../services/topics.service";
import SimpleThread from "../SimpleThread/SimpleThread";

export default function SingleThread() {
  const [thread, setThread] = useState(null);
  const { id } = useParams();

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
    console.log(thread);
  }, [id]);
  return (
    <div>
      <h1>Single Thread</h1>
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
