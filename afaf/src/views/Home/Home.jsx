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
    if (topics.find((topic) => topic.id === id && topic.likedBy.includes(handle))) return;
    await likeTopic(handle, id);

    setTopics(prevTopics => prevTopics.map((topic) => {
        if (topic.id === id) return { ...topic, likedBy: [...topic.likedBy, handle] };
        return topic;
    }));
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);

    setTopics(prevTopics => prevTopics.map((topic) => {
        if (topic.id === id)return {...topic,likedBy: topic.likedBy.filter((user) => user !== handle)};
        return topic;
      }));
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
        ))}
      </div>
    </div>
  );
}
