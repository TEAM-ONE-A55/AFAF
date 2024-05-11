import { useEffect, useState } from "react";
import "./SearchResults.css";
import SortingDropdown from "../../components/Dropdown/Dropdown";
import { threadsFilterOptions, threadsSortingOptions } from "../../constants/constants";
import { useParams } from "react-router-dom";
import { dislikeTopic, getAllTopicsBySearch, likeTopic } from "../../services/threads.service";
import SimpleThread from "../Threads/SimpleThread/SimpleThread";
import { sortThreads } from "../../functions/sorting-functions";

export default function SearchResults() {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState("dateDescending");
  const [filterBy, setFilterBy] = useState("title");
  const { query } = useParams();

  useEffect(() => {
    if (query) getAllTopicsBySearch(query, filterBy).then(setTopics);
  }, [query, filterBy]);

  const topicLike = async (handle, id) => {
    await likeTopic(handle, id);
    getAllTopicsBySearch(query).then(setTopics);
  };

  const topicDislike = async (handle, id) => {
    await dislikeTopic(handle, id);
    getAllTopicsBySearch(query).then(setTopics);
  };

  const handleSortBy = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleFilterBy = (filterBy) => {
    setFilterBy(filterBy);
  };

  return (
    <div className='search-results-container'>
      {query ? (
        <>
          <h3>Search results for {`"${query}"`}</h3>
          <SortingDropdown
            options={threadsFilterOptions}
            defaultOption={filterBy}
            onChange={handleFilterBy}
          />

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
            <p>
              The specified {query} was not found. Try refining your search terms or adjusting the
              filters for better results.
            </p>
          )}
        </>
      ) : (
        <>
          <h3>Ready to search? What can I help you find?{query}</h3>
          <SortingDropdown
            options={threadsFilterOptions}
            defaultOption={filterBy}
            onChange={handleFilterBy}
          />
        </>
      )}
    </div>
  );
}
