import "./CreateThread.css";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { addThread } from "../../../services/threads.service";
import { uploadThreadImage } from "../../../services/storage.service";
import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from "../../../constants/constants";
import Avatar from "../../../components/Avatar/Avatar";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { MAX_Thread_Content_Length, MAX_Thread_Title_Length, MIN_Thread_Content_Length, MIN_Thread_Title_Length } from "../../../constants/constants";

export default function CreateThread() {
  const { user, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const [selected, setSelected] = useState("post");

  const [thread, setThread] = useState({
    content: "",
    title: "",
    uuid: v4()
  });

  const [attachedImg, setAttachedImg] = useState(null);
  
  const [imageUrl, setImageUrl] = useState("");

  const updateThread = (key, value) => {
    setThread({
      ...thread,
      [key]: value,
    });
  };

  const handleThreadTypeNav = (type) => {
    setSelected((prev) => {
      if (prev === type) return prev;
      setAttachedImg(null);
      return type;
    });
  };

  useEffect(() => {
    if (attachedImg) {
        uploadThreadImage(attachedImg, thread.uuid)
            .then((url) => setImageUrl(url))
            .then(() => toast.success("Image uploaded successfully!"))
            .catch((e) => toast(e.message));
    }
  }, [attachedImg, thread.uuid]);

  const getThreadTypeInput = () => {
    switch (selected) {
      case "post":
        return (
          <div className="create-thread-type-inputs">
            <input
              className="thread-type-title"
              type="text"
              placeholder="Title"
              onChange={(e) => updateThread("title", e.target.value)}
            />
            <textarea
              placeholder="What's it about?"
              onChange={(e) => updateThread("content", e.target.value)}
            />
          </div>
        );
      case "image":
        return (
          <div className="create-thread-type-inputs">
            <input
              className="thread-type-title"
              type="text"
              placeholder="Title"
              onChange={(e) => updateThread("title", e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setAttachedImg(e.target.files[0])}
            />
            {attachedImg && <img src={imageUrl} alt="Attached" />}
            {attachedImg && (
              <button onClick={() => setAttachedImg(null)}>Remove</button>
            )}
          </div>
        );
      case "url":
        return (
          <div className="create-thread-type-inputs">
            <input
              className="thread-type-title"
              type="text"
              placeholder="Title"
              onChange={(e) => updateThread("title", e.target.value)}
            />
            <input
              className="thread-type-url"
              type="text"
              placeholder="Url"
              onChange={(e) => updateThread("content", e.target.value)}
            />
          </div>
        );
    }
  };

  const postThread = async () => {

    if (!thread.title) 
        return toast.error("Title is a required field.");
    if (!attachedImg && !thread.content) 
        return toast.error('Content is a required field.');
    if (thread.title.length < MIN_TITLE_LENGTH)
      return toast.error("Title must be at least 16 characters long.");
    if (thread.title.length > MAX_TITLE_LENGTH)
      return toast.error("Title must be at most 64 characters long.");
    if (!attachedImg && thread.content.length < MIN_CONTENT_LENGTH)
      return toast.error("Content must be at least 32 characters long.");
    if (!attachedImg && thread.content.length > MAX_CONTENT_LENGTH)
      return toast.error("Content must be at most 8192 characters long.");

    try {
      await addThread(
        thread.title,
        thread.content,
        userData.handle,
        imageUrl,
        thread.uuid
      );
      toast.success("Thread created successfully!");
      navigate("/threads/newest");
    } catch (e) {
      toast.error("Could not create thread.");
    } finally {
      setAttachedImg(null);
    }
  };

  if (user) {
    return (
      <div className="create-thread-container">
        <h2>Create Thread</h2>
        <hr />
        <div className="create-thread-container-content">
          <div className="create-thread-left-side">
            <div className="create-thread-user">
              <Avatar
                Width="50px"
                Height="50px"
                url={userData.avatar}
                onClick={() => navigate("/profile")}
              />
              <h3>{userData.handle}</h3>
            </div>
            <div className="create-thread-type">
              <nav>
                <span
                  className={
                    selected === "post" ? "create-thread-nav-active" : ""
                  }
                  onClick={() => handleThreadTypeNav("post")}
                >
                  Post
                </span>
                <span
                  className={
                    selected === "image" ? "create-thread-nav-active" : ""
                  }
                  onClick={() => handleThreadTypeNav("image")}
                >
                  Image
                </span>
                <span
                  className={
                    selected === "url" ? "create-thread-nav-active" : ""
                  }
                  onClick={() => handleThreadTypeNav("url")}
                >
                  Link
                </span>
              </nav>
              {getThreadTypeInput()}
              <button className="post-button" onClick={postThread}>
                Post
              </button>
            </div>
          </div>
          <div className="create-thread-right-side">
            Community guidelines////
          </div>
        </div>
      </div>
    );
  } else return <Navigate replace to="/login" />;
}
