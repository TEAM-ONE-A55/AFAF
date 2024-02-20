import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { allThreads } from "../../../functions/filter-functions";

export default function AllThreads() {
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
      {allThreads(topics).map((topic) => (
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
