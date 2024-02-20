import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/threads.service";
import SimpleThread from "../SimpleThread/SimpleThread";
import { newest } from "../../../functions/filter-functions";

export default function Newest() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then(setTopics);
    console.log("render");
  }, []);

  const topicLike = () => {
    getAllTopics().then(setTopics);
  };

  const topicDislike = () => {
    getAllTopics().then(setTopics);
  };

  return (
    <div>
      {newest(topics).map((topic) => (
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
