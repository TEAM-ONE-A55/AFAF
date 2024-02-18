export const sortUsers = (users, sortBy) => {
  switch (sortBy) {
    case "dateAscending":
      return users.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    case "usernameAscending":
      return users.slice().sort((a, b) => a.handle.localeCompare(b.handle));
    case "usernameDescending":
      return users.slice().sort((a, b) => b.handle.localeCompare(a.handle));
    case "userActivityAscending":
       return users.slice().sort((a, b) =>(a.createdTopics ? Object.keys(a.createdTopics).length : 0 ) - (b.createdTopics ? Object.keys(b.createdTopics).length : 0));
    case "userActivityDescending":
       return users.slice().sort((a, b) =>(b.createdTopics ? Object.keys(b.createdTopics).length : 0) - (a.createdTopics ? Object.keys(a.createdTopics).length : 0));
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
      return threads.slice().sort((a, b) =>(a.likedBy ? Object.keys(a.likedBy).length : 0) - (b.likedBy ? Object.keys(b.likedBy).length : 0));
    case "mostLikedDescending":
      return threads.slice().sort((a, b) =>(b.likedBy ? Object.keys(b.likedBy).length : 0) - (a.likedBy ? Object.keys(a.likedBy).length : 0));
    case "mostCommentedAscending":
      return threads.slice().sort((a, b) =>(a.commentedBy ? Object.keys(a.commentedBy).length : 0) - (b.commentedBy ? Object.keys(b.commentedBy).length : 0));
    case "mostCommentedDescending":
      return threads.slice().sort((a, b) =>(b.commentedBy ? Object.keys(b.commentedBy).length : 0) - (a.commentedBy ? Object.keys(a.commentedBy).length : 0));
    
    default:
      return threads.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)); // Default to date descending
  }
};
