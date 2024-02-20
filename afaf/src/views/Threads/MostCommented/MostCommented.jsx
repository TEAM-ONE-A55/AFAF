import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { popularByComments } from "../../../functions/filter-functions";

export default function MostCommented() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  const topicLike = () => {
    getAllTopics().then(setTopics);
  };

  const topicDislike = () => {
    getAllTopics().then(setTopics);
  };

  return (
    <div>
      {popularByComments(topics).map((topic) => (
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
