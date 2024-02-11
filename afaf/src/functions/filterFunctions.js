export const popularByLikes = (topics, setTopics) => {
  setTopics(
    [...topics].sort((a, b) => b.likedBy.length - a.likedBy.length).slice(0, 10)
  );
};

export const allThreads = (topics, setTopics) => {
  setTopics(
    [...topics].sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
  );
};
export const newest = (topics, setTopics) => {
  setTopics(
    [...topics]
      .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
      .slice(0, 10)
  );
};

export const popularByComments = (topics, setTopics) => {
  setTopics(
    [...topics]
      .sort((a, b) => b.commentedBy.length - a.commentedBy.length)
      .slice(0, 10)
  );
};
