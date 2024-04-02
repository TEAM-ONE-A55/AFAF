import {
  ref,
  push,
  get,
  query,
  orderByChild,
  update,
  equalTo,
  remove,
} from "firebase/database";
import { db } from "../config/firebase-config";

const fromTopicsDocument = (snapshot) => {
  const topicDocument = snapshot.val();

  return Object.keys(topicDocument).map((key) => {
    const topic = topicDocument[key];

    return {
      ...topic,
      id: key,
      createdOn: new Date(topic.createdOn),
      likedBy: topic.likedBy ? Object.keys(topic.likedBy) : [],
      dislikedBy: topic.dislikedBy ? Object.keys(topic.dislikedBy) : [],
    };
  });
};

// Create new topic
export const addThread = async (title, content, author, url, uuid, type) => {
  try {
    const thread = push(ref(db, "topics"), {
      content,
      title,
      author,
      url,
      uuid,
      type,
      createdOn: Date.now(),
      likedBy: {},
      dislikedBy: {}
    });

    const threadId = thread.key;
    const userRef = ref(db, `users/${author}/createdTopics/${threadId}`);
    await push(userRef, threadId);
    return threadId;
  } catch (e) {
    console.log(e.message);
  }
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
    likedBy: snapshot.val()[key].likedBy
      ? Object.keys(snapshot.val()[key].likedBy)
      : [],
    dislikedBy: snapshot.val()[key].dislikedBy
      ? Object.keys(snapshot.val()[key].dislikedBy)
      : [],
  }));
  return topics;
};

export const getAllTopicsBySearch = async (
  search,
  searchByKey = "title",
  key = "createdOn"
) => {
  const snapshot = await get(query(ref(db, "topics"), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const topics = Object.keys(snapshot.val())
    .map((key) => ({
      id: key,
      ...snapshot.val()[key],
      createdOn: new Date(snapshot.val()[key].createdOn),
      likedBy: snapshot.val()[key].likedBy
        ? Object.keys(snapshot.val()[key].likedBy)
        : [],
      dislikedBy: snapshot.val()[key].dislikedBy
        ? Object.keys(snapshot.val()[key].dislikedBy)
        : [],
    }))
    .filter((topic) =>
      topic[searchByKey].toLowerCase().includes(search.toLowerCase())
    );

  return topics;
};

export const getTopicById = async (id) => {
  const snapshot = await get(ref(db, `topics/${id}`));
  if (!snapshot.exists()) return null;

  const topic = {
    id,
    ...snapshot.val(),
    createdOn: new Date(snapshot.val().createdOn),
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    dislikedBy: snapshot.val().dislikedBy
      ? Object.keys(snapshot.val().dislikedBy)
      : [],
  };

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
            dislikedBy: topic.dislikedBy ? Object.keys(topic.dislikedBy) : [],
          };
        });
      })
    );
  });
};

export const getTopicsByAuthor = async (handle) => {
  const snapshot = await get(
    query(ref(db, "topics"), orderByChild("author"), equalTo(handle))
  );
  if (!snapshot.exists()) return [];
  return fromTopicsDocument(snapshot);
};

export const likeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedTopics/${topicId}`] = true;
  updateLikes[`/topics/${topicId}/dislikedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/dislikedTopics/${topicId}`] = null;

  return update(ref(db), updateLikes);
};

export const dislikeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/dislikedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/dislikedTopics/${topicId}`] = true;
  updateLikes[`/topics/${topicId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedTopics/${topicId}`] = null;

  return update(ref(db), updateLikes); 
};

export const undoLikeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedTopics/${topicId}`] = null;

  return update(ref(db), updateLikes);
}

export const undoDislikeTopic = (handle, topicId) => {
  const updateLikes = {};
  updateLikes[`/topics/${topicId}/dislikedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/dislikedTopics/${topicId}`] = null;

  return update(ref(db), updateLikes);
}

export const deleteTopic = async (handle, id) => {
  const topicsToRemove = await getTopicsByAuthor(handle);
  topicsToRemove.filter((topic) => {
    if (topic.id === id) {
      remove(ref(db, `topics/${topic.id}`));
    }
  });
};

export const updateTopic = async (id, key, value) => {
  const path = `topics/${id}/${key}`;
  return update(ref(db), { [path]: value });
};

export const updateThreadDB = async (id, thread) => {
  const path = `topics/${id}`;
  await update(ref(db), { [path]: { ...thread } });
  return id;
};

// Comments service

export const getComments = async (topicId) => {
  const snapshot = await get(ref(db, `topics/${topicId}/comments`));
  if (!snapshot.exists()) return null;
  return snapshot.val();
};

export const updateComment = async (id, key, value) => {
  const path = `topics/${id}/comments/${key}/comment/`;
  return update(ref(db), { [path]: value });
};

export const deleteComment = async (topicId, commentId) => {
  remove(ref(db, `topics/${topicId}/comments/${commentId}`));
};