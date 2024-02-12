import { useEffect, useState } from "react";
import {
  dislikeTopic,
  getAllTopics,
  likeTopic,
} from "../../../services/topics.service";
import SimpleThread from "../SimpleThread/SimpleThread";

export default function MostCommented() {
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
        .sort((a, b) => new Date(b.commentedBy.length) - new Date(a.commentedBy.length))
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