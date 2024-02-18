import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";

export const uploadAvatar = async (image, handle, key) => {
  const imageRef = ref(storage, `images/${handle}/${key}/${image.name + v4()}`);
  await uploadBytes(imageRef, image);
  // console.log(getDownloadURL)
  return getDownloadURL(imageRef);
};

export const deleteAvatar = (handle, key) => {
  const lastFolderRef = ref(storage, `images/${handle}/${key}`);
  listAll(lastFolderRef)
    .then((res) => deleteObject(res.items[0]))
    .catch((error) => {
      console.log(error.message);
    });
};

export const uploadThreadImage = async (image, uuid) => {
  const imageRef = ref(storage, `thread-images/${uuid}/${image.name}`);
  await uploadBytes(imageRef, image);
  return getDownloadURL(imageRef);
}

// Unimplemented, but would be used to delete thread images
export const deleteThreadImage = (uuid) => {
  const lastFolderRef = ref(storage, `thread-images/${uuid}`);
  listAll(lastFolderRef)
    .then((res) => deleteObject(res.items[0]))
    .catch((error) => {
      console.log(error.message);
    });
};