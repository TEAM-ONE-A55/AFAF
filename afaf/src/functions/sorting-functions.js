export const sortUsers = (users, sortBy) => {
  if (users) {
    console.log(users)
    switch (sortBy) {
      case "dateAscending":
        return users
          .slice()
          .sort(
            (a, b) =>
              (a ? new Date(a.createdOn) : 0) -
              (b ? new Date(b.createdOn) : 0)
          );
      case "usernameAscending":
        return users
          .slice()
          .sort(
            (a, b) => a.handle && a.handle.localeCompare(b.handle && b.handle)
          );
      case "usernameDescending":
        return users
          .slice()
          .sort(
            (a, b) => b.handle && b.handle.localeCompare(a.handle && a.handle)
          );
      case "userActivityAscending":
        return users
          .slice()
          .sort(
            (a, b) =>
              (a.createdTopics ? Object.keys(a.createdTopics).length : 0) -
              (b.createdTopics ? Object.keys(b.createdTopics).length : 0)
          );
      case "userActivityDescending":
        return users
          .slice()
          .sort(
            (a, b) =>
              (b.createdTopics ? Object.keys(b.createdTopics).length : 0) -
              (a.createdTopics ? Object.keys(a.createdTopics).length : 0)
          );
      default:
        return users
          .slice()
          .sort(
            (a, b) =>
              (b ? new Date(b.createdOn) : 0) -
              (a ? new Date(a.createdOn) : 0)
          );
    }
  }
};

export const sortThreads = (threads, sortBy) => {
  if (threads) {
    switch (sortBy) {
      case "dateAscending":
        return threads
          .slice()
          .sort(
            (a, b) =>
              (a ? new Date(a.createdOn && a.createdOn) : 0) -
              (b ? new Date(b.createdOn && b.createdOn) : 0)
          );
      case "authorAscending":
        return threads
          .slice()
          .sort(
            (a, b) => a.author && a.author.localeCompare(b.author && b.author)
          );
      case "authorDescending":
        return threads
          .slice()
          .sort(
            (a, b) => b.author && b.author.localeCompare(a.author && a.author)
          );
      case "mostLikedAscending":
        return threads
          .slice()
          .sort(
            (a, b) =>
              (a.likedBy ? Object.keys(a.likedBy).length : 0) -
              (b.likedBy ? Object.keys(b.likedBy).length : 0)
          );
      case "mostLikedDescending":
        return threads
          .slice()
          .sort(
            (a, b) =>
              (b.likedBy ? Object.keys(b.likedBy).length : 0) -
              (a.likedBy ? Object.keys(a.likedBy).length : 0)
          );
      case "mostCommentedAscending":
        return threads
          .slice()
          .sort(
            (a, b) =>
              (a.comments ? Object.keys(a.comments).length : 0) -
              (b.comments ? Object.keys(b.comments).length : 0)
          );
      case "mostCommentedDescending":
        return threads
          .slice()
          .sort(
            (a, b) =>
              (b.comments ? Object.keys(b.comments).length : 0) -
              (a.comments ? Object.keys(a.comments).length : 0)
          );

      default:
        return threads
          .slice()
          .sort(
            (a, b) =>
              (b ? new Date(b.createdOn) : 0) -
              (a ? new Date(a.createdOn) : 0)
          ); // Default to date descending
    }
  }
};
