import {
    ref,
    push,
    get,
    query,
    equalTo,
    orderByChild,
    update,
  } from "firebase/database";
  import { db } from "../config/firebase-config";
  
  // Create new topic
  export const addTopic = async (title, content, author) => {
    return push(ref(db, "topics"), {
      content,
      title,
      author,
      createdOn: Date.now()})
    // }).then((result) => {
    //   return getTopicById(result.key);
    // });
  };
  
  // Get all topics by date!!! The second argument is optional, we can use just
  // const snapshot = await get(ref(db, 'tweets'))
  export const getAllTopics = async (filter = 'createdOn') => {
    // From Demo Stoyan:
    const snapshot = await get(ref(db, "topics"), orderByChild(filter));
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  };
  
  // From README file:
  // return get(ref(db, 'topics'))
  // .then(snapshot => {
  //     if (!snapshot.exists()) return [];
  //     return fromTopicsDocument(snapshot)
  // })
  
  // key could be title, author, etc... and it would replace 'title' => equalTo(search, key)
  // eslint-disable-next-line no-unused-vars
  export const getAllTopicsSearch = async (search, filter = 'createdOn') => {
    // From Demo Stoyan:
    const snapshot = search
      ? await get(
          ref(db, "topics"),
          orderByChild(filter),
          equalTo(search, "title")
        )
      : await get(ref(db, "topics"), orderByChild(filter));
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  };
  
  export const getTopicById = async (id) => {
    return get(ref(db, `topics/${id}`)).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error(`Topic with id ${id} does not exist!`);
      }
      const topic = snapshot.val();
      topic.id = id;
      topic.createdOn = new Date(topic.createdOn);
      if (!topic.likedBy) topic.likedBy = [];
      if (!topic.commentedBy) topic.commentedBy = [];
      return topic;
    });
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
  
  export const getTopicsByAuthor = async (handle) => {
    return get(
      query(ref(db, "topics"), orderByChild("author"), equalTo(handle))
    ).then((snapshot) => {
      if (!snapshot.exists()) return [];
      return fromTopicsDocument(snapshot);
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
    updateLikes[`/tweets/${topicId}/likedBy/${handle}`] = null;
    updateLikes[`/users/${handle}/likedTweets/${topicId}`] = null;
  
    return update(ref(db), updateLikes);
  };
  
  export const fromTopicsDocument = (snapshot) => {
    const topicsDocument = snapshot.val();
  
    return Object.keys(topicsDocument).map((key) => {
      const topic = topicsDocument[key];
  
      return {
        ...topic,
        id: key,
        createdOn: new Date(topic.createdOn),
        likedBy: topic.likedBy ? Object.keys(topic.likedBy) : [],
        commentedBy: topic.commentedBy ? Object.keys(topic.commentedBy) : [],
      };
    });
  };
  