import { getTopicsByAuthor } from "../services/threads.service";

export const popularByLikes = (topics) => {
  return topics
    .slice()
    .sort(
      (a, b) => Object.keys(b.likedBy).length - Object.keys(a.likedBy).length
    )
    .slice(0, 10);
};

export const allThreads = (topics) => {
  return topics.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
};
export const newest = (topics) => {
  return topics
    .slice()
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    .slice(0, 10);
};

export const popularByComments = (topics) => {
  return topics
    .slice()
    .sort(
      (a, b) =>
      (b.comments ?
        Object.keys(b.comments).length : 0) - (a.comments ? Object.keys(a.comments).length : 0)
    )
    .slice(0, 10);
};


export const getByAuthor = (handle, setTopics) => {
  getTopicsByAuthor(handle)
  .then(setTopics)
}


