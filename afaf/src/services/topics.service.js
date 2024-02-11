import { ref, push, get, query, orderByChild, update } from "firebase/database";
import { db } from "../config/firebase-config";

// Create new topic
export const addTopic = async (title, content, author) => {
  return push(ref(db, "topics"), {
    content,
    title,
    author,
    createdOn: Date.now(),
  });
};

// key could be title, author, etc... and it would replace 'title' => equalTo(search, key)
// eslint-disable-next-line no-unused-vars
export const getAllTopics = async (key = "createdOn") => {
  const snapshot = await get(query(ref(db, "topics"), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const topics = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toLocaleString(),
    likedBy: snapshot.val()[key].likedBy
      ? Object.keys(snapshot.val()[key].likedBy)
      : [],
    commentedBy: snapshot.val()[key].commentedBy
      ? Object.keys(snapshot.val()[key].commentedBy)
      : [],
  }));
  return topics;
};

export const getAllTopicsBySearch = async (search, key = "createdOn") => {
  const snapshot = await get(query(ref(db, "topics"), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const topics = Object.keys(snapshot.val())
    .map((key) => ({
      id: key,
      ...snapshot.val()[key],
      createdOn: new Date(snapshot.val()[key].createdOn).toLocaleString(),
      likedBy: snapshot.val()[key].likedBy
        ? Object.keys(snapshot.val()[key].likedBy)
        : [],
      commentedBy: snapshot.val()[key].commentedBy
        ? Object.keys(snapshot.val()[key].commentedBy)
        : [],
    }))
    .filter((topic) =>
      topic.title.toLowerCase().includes(search.toLowerCase())
    );
  console.log(topics);
  return topics;
};

export const getTopicById = async (id) => {
  // const snapshot = await get(query(ref(db, "topics"), equalTo(id, "id")));
  const snapshot = await get(ref(db, `topics/${id}`));
  if (!snapshot.exists()) return null;

  const topic = {
    id,
    ...snapshot.val(),
    createdOn: new Date(snapshot.val().createdOn).toLocaleString(),
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    commentedBy: snapshot.val().commentedBy
      ? Object.keys(snapshot.val().commentedBy)
      : [],
  };

  // console.log(topic);
  return topic;
};

export const getLikedTopics = async (handle) => {
  return get(ref(db, `users/${handle}`)).then((snapshot) => {
    if (!snapshot.val()) {
      throw new Error(`User with handle @${handle} does not exist!`);
    }
    const user = snapshot.val();
    if (!user.likedTopics) return [];
    return Promise.all(
      Object.keys(user.likedTopics).map((key) => {
        return get(ref(db, `topics/${key}`)).then((snapshot) => {
          const topic = snapshot.val();

          return {
            ...topic,
            createdOn: new Date(topic.createdOn),
            id: key,
            likedBy: topic.likedBy ? Object.keys(topic.likedBy) : [],
            commentedBy: topic.commentedBy
              ? Object.keys(topic.commentedBy)
              : [],
          };
        });
      })
    );
  });
};

export const likeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedTopics/${topicId}`] = true;

  return update(ref(db), updateLikes);
};

export const dislikeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedTopics/${topicId}`] = null;

  return update(ref(db), updateLikes);
};
