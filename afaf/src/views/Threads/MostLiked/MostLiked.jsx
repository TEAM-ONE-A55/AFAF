import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { popularByLikes } from "../../../functions/filter-functions";

export default function MostLiked() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  const topicLike = (handle, id) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === id) {
          topic.likedBy = topic.likedBy.includes(handle)
            ? topic.likedBy.filter((u) => u !== handle)
            : [...topic.likedBy, handle];
        }
        return topic;
      })
    );
  };

  const topicDislike = (handle, id) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === id) {
          topic.dislikedBy = topic.dislikedBy.includes(handle)
            ? topic.dislikedBy.filter((u) => u !== handle)
            : [...topic.dislikedBy, handle];
        }
        return topic;
      })
    );
  };
  return (
    <div>
      {popularByLikes(topics).map((topic) => (
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
