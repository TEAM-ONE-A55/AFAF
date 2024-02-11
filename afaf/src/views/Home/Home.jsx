import { Link, Navigate } from "react-router-dom";
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
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";

export default function Navi() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  const { user, userData } = useContext(AppContext);

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
        {topics.map((topic) => {
          return (
            <div key={topic.id} style={{ border: "solid" }}>
              <h3>{topic.title}</h3>
              <p>{topic.content}</p>
              <p>{topic.createdOn}</p>
              <p>
                {topic.likedBy.length} likes{" "}
                {user && (
                  <div>
                    <Button
                      onClick={() => topicLike(userData.handle, topic.id)}
                    >
                      Like
                    </Button>
                    <Button
                      onClick={() => topicDislike(userData.handle, topic.id)}
                    >
                      Dislike
                    </Button>
                  </div>
                )}
              </p>
              <p>{topic.commentedBy.length} comments</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
