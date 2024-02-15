import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { defaultAvatar } from '../constants/constants';

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`))
}

export const createUserHandle = (handle, uid, email, name) => {
    return set(ref(db, `users/${handle}`), { handle, uid, email, name, createdOn: new Date().valueOf(), likedTopics: {}, createdTopic: {}, postReplies: {}, avatar: defaultAvatar, role: 'user' })
}

export const getUserData = (uid) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)))
}

export const updateUserData = async (handle, key, value) => {
    const path = `users/${handle}/${key}`;
    return update(ref(db), { [path]: value });
}