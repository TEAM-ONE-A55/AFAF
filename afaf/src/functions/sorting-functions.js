export const sortUsers = (users, sortBy) => {
  switch (sortBy) {
    case "dateAscending":
      return users.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    case "usernameAscending":
      return users.slice().sort((a, b) => a.handle.localeCompare(b.handle));
    case "usernameDescending":
      return users.slice().sort((a, b) => b.handle.localeCompare(a.handle));
    case "userActivityAscending":
       return users.slice().sort((a, b) =>Object.keys(a.createdTopics).length - Object.keys(b.createdTopics).length);
    case "userActivityDescending":
       return users.slice().sort((a, b) =>Object.keys(b.createdTopics).length - Object.keys(a.createdTopics).length);
    default:
      return users.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  }
};

export const sortThreads = (threads, sortBy) => {
  switch (sortBy) {
    case "dateAscending":
      return threads.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    case "authorAscending":
      return threads.slice().sort((a, b) => a.author.localeCompare(b.author));
    case "authorDescending":
      return threads.slice().sort((a, b) => b.author.localeCompare(a.author));
    case "mostLikedAscending":
      return threads.slice().sort((a, b) =>Object.keys(a.likedBy).length - Object.keys(b.likedBy).length);
    case "mostLikedDescending":
      return threads.slice().sort((a, b) =>Object.keys(b.likedBy).length - Object.keys(a.likedBy).length);
    case "mostCommentedAscending":
      return threads.slice().sort((a, b) =>Object.keys(a.commentedBy).length - Object.keys(b.commentedBy).length);
    case "mostCommentedDescending":
      return threads.slice().sort((a, b) =>Object.keys(b.commentedBy).length - Object.keys(a.commentedBy).length);
    
    default:
      return threads.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)); // Default to date descending
  }
};
