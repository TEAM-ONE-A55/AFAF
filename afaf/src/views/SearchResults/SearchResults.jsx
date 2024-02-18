import { useEffect, useState } from "react";
import "./SearchResults.css";
import SortingDropdown from "../../components/SortingDropdown/SortingDropdown";
import { threadsSortingOptions } from "../../constants/constants";
import { useParams } from "react-router-dom";
import {
  dislikeTopic,
  getAllTopicsBySearch,
  likeTopic,
} from "../../services/threads.service";
import SimpleThread from "../Threads/SimpleThread/SimpleThread";
import { sortThreads } from "../../functions/sorting-functions";

export default function SearchResults() {
  const [topics, setTopics] = useState([]);
  const [sortBy, setUsersSortBy] = useState("dateDescending");
  const { query } = useParams();

  useEffect(() => {
    getAllTopicsBySearch(query).then(setTopics);
  }, [query]);

  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getAllTopicsBySearch(query).then(setTopics);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getAllTopicsBySearch(query).then(setTopics);
  };

  const handleSortBy = (sortBy) => {
    setUsersSortBy(sortBy);
  };

  console.log(topics);

  return (
    <div className="search-results-container">
      <h3>Search results for {query}</h3>
      {topics.length !== 0 ? (
        <>
          <SortingDropdown
            options={threadsSortingOptions}
            defaultOption={sortBy}
            onChange={handleSortBy}
          />
          {sortThreads(topics, sortBy).map((topic) => (
            <SimpleThread
              key={topic.id}
              topic={topic}
              topicLike={topicLike}
              topicDislike={topicDislike}
            />
          ))}
        </>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
}
