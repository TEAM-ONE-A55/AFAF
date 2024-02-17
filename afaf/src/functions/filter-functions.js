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
        Object.keys(b.commentedBy).length - Object.keys(a.commentedBy).length
    )
    .slice(0, 10);
};


export const getByAuthor = (handle, setTopics) => {
  getTopicsByAuthor(handle)
  .then(setTopics)
}


