import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";

export const uploadAvatar = async (image, handle, key) => {
  try {
    const imageRef = ref(storage, `images/${handle}/${key}/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteAvatar = async (handle, key) => {
  try {
    const lastFolderRef = ref(storage, `images/${handle}/${key}`);
    const res = await listAll(lastFolderRef);
    await deleteObject(res.items[0]);
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadThreadImage = async (image, uuid) => {
  try {
    const imageRef = ref(storage, `thread-images/${uuid}/${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteThreadImage = async (uuid) => {
  try {
    const lastFolderRef = ref(storage, `thread-images/${uuid}`);
    const res = await listAll(lastFolderRef);
    await deleteObject(res.items[0]);
  } catch (e) {
    console.log(e.message);
  }
};
