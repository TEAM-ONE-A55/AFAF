import "./CreateThread.css";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { addThread } from "../../../services/threads.service";
import { uploadThreadImage, deleteThreadImage } from "../../../services/storage.service";
import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from "../../../constants/constants";
import Avatar from "../../../components/Avatar/Avatar";
import toast from "react-hot-toast";
import { v4 } from "uuid";

export default function CreateThread() {
  const { user, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const [selected, setSelected] = useState("post");
  const [attachedImg, setAttachedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState({
    content: "",
    title: "",
    uuid: v4()
  });

  const updateThread = (key, value) => {
    setThread({
      ...thread,
      [key]: value,
    });
  };

  const removeAttachedImg = async () => {
    try {
      await deleteThreadImage(thread.uuid);
      setImageUrl("");
      setAttachedImg(null);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleThreadTypeNav = async (type) => {
    if (selected === type) return;
    if (imageUrl) {
      try {
        await removeAttachedImg();
      } catch (e) {
        console.log(e.message);
      }
    }
    setSelected(type);
  };

  useEffect(() => {
    if (attachedImg) {
      setLoading(true);
        uploadThreadImage(attachedImg, thread.uuid)
            .then((url) => setImageUrl(url))
            .then(() => toast.success("Image uploaded successfully!"))
            .catch((e) => toast(e.message))
            .finally(() => setLoading(false));
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
              id="upload-photo-input"
              type="file"
              onChange={(e) => setAttachedImg(e.target.files[0])}
            />
            {!attachedImg && <label className="upload-photo-input-button" htmlFor="upload-photo-input">Upload an image</label>}
            {loading && <p>Uploading...</p>}
            <div className="attached-thread-image-container">
              {imageUrl && <img className="attached-thread-image" src={imageUrl} alt="Attached" />}
              {imageUrl && (
                <button className="attached-thread-image-remove-button" onClick={removeAttachedImg}>Remove</button>
              )}
            </div>
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
        thread.uuid,
        selected
      );
      toast.success("Thread created successfully!");
      navigate("/threads/newest");
    } catch (e) {
      console.log(e.message);
      toast.error("Could not create thread.");
    } finally {
      setAttachedImg(null);
    }
  };

  const isBlocked = () => {
    return toast.error(
      "Oops! You're Blocked: Rule Break Detected. Admin's put you on pause"
    );
  };

  if (user) {
    return (
      <div className="create-thread-container">
        <hr />
        <h2>Create Thread</h2>
        <div className="create-thread-container-content">
          <div className="create-thread-left-side">
            <div className="create-thread-user">
              <Avatar
                Width="40px"
                Height="40px"
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
              <button className="post-button" onClick={() => userData.bloked === false ? postThread() : isBlocked()}>
                Create Thread
              </button>
            </div>
          </div>
          <div className="create-thread-right-side">
            <h4>We appreciate your courteus language!</h4>
            <ol>
              <li>Conversate thoughtfully and considerately. Neither hatred nor discrimination will be tolerated.</li>
              <br />
              <li>Welcome all perspectives - tolerance is key to a thriving community.</li>
              <br />
              <li>Respect others&apos; privacy. Threat others the way you&apos;d like to be treated.</li>
              <br />
              <li>Avoid indecent language - although we strongly advocate for displaying your good sense of humor, please don&apos;t take it too far.</li>
              <br />
              <li>Have fun!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  } else return <Navigate replace to="/login" />;
}
