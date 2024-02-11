import { Link } from "react-router-dom";
import { getAllTopics } from "../../services/topics.service";
import { useEffect, useState } from "react";
import {
  allThreads,
  newest,
  popularByComments,
  popularByLikes,
} from "../../functions/filterFunctions";

export default function Navi() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  return (
    <div>
      <span>
        <Link onClick={() => allThreads(topics, setTopics)}>All Threads</Link>
        <Link onClick={() => popularByLikes(topics, setTopics)}>Most Liked</Link>
        <Link onClick={() => popularByComments(topics, setTopics)}>Most commented</Link>
        <Link onClick={() => newest(topics, setTopics)}>Newest</Link>
      </span>
      <div>
        {topics.map((topic) => {
          return (
            <div key={topic.id}>
              <h3>{topic.title}</h3>
              <p>{topic.content}</p>
              <p>{topic.createdOn}</p>
              <p>{topic.likedBy.length} likes</p>
              <p>{topic.commentedBy.length} comments</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
