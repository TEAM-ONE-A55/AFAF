import toast from "react-hot-toast";
import { deleteThreadImage } from "../services/storage.service";
import { deleteTopic } from "../services/threads.service";
import { deleteUserTopic } from "../services/users.service";

export const deleteThread = async (author, topic, uuid, url = "", toastMessage="Thread has been successfully deleted") => {
    try {
      await deleteUserTopic(author, topic);
      await deleteTopic(author, topic);
      if (url) {
        deleteThreadImage(uuid);
      }
      return toast.success(toastMessage);
    } catch (e) {
      return toast.error("Something went wrong. Please try again later.");
    }
  };

  