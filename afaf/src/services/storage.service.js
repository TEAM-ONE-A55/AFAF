import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase-config";
import { v4 } from "uuid";

export const uploadAvatar = async (image, handle, key) => {
  const imageRef = ref(storage, `images/${handle}/${key}/${image.name + v4()}`);
  await uploadBytes(imageRef, image);
  // console.log(getDownloadURL)
  return getDownloadURL(imageRef);
};
