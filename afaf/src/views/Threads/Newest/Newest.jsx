import { useEffect, useState } from "react";
import {
  dislikeTopic,
  getAllTopics,
  likeTopic,
} from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";

export default function Newest() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getAllTopics().then(setTopics);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getAllTopics().then(setTopics);
  };

  return (
    <div>
      {topics
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
        .map((topic) => (
          <SimpleThread
            key={topic.id}
            topic={topic}
            topicLike={topicLike}
            topicDislike={topicDislike}
          />
        ))}
    </div>
  );
}