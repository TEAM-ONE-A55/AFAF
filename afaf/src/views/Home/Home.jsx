import { Link } from "react-router-dom";
import {
  dislikeTopic,
  getAllTopics,
  likeTopic,
} from "../../services/topics.service";
import { useEffect, useState } from "react";
import {
  allThreads,
  newest,
  popularByComments,
  popularByLikes,
} from "../../functions/filterFunctions";
import SimpleThread from "../Threads/SimpleThread/SimpleThread";

export default function Navi() {
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
      <span>
        <Link onClick={() => allThreads(topics, setTopics)}>All Threads</Link>
        <Link onClick={() => popularByLikes(topics, setTopics)}>
          Most Liked
        </Link>
        <Link onClick={() => popularByComments(topics, setTopics)}>
          Most commented
        </Link>
        <Link onClick={() => newest(topics, setTopics)}>Newest</Link>
      </span>
      <div>
        {topics.map((topic) => (
          <SimpleThread
            key={topic.id}
            topic={topic}
            topicLike={topicLike}
            topicDislike={topicDislike}
          />
          )   
        )}
      </div>
    </div>
  );
}
