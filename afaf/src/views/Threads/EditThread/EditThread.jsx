import "./EditThread.css";
import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { addThread } from "../../../services/threads.service";
import { uploadThreadImage, deleteThreadImage } from "../../../services/storage.service";
import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from "../../../constants/constants";
import { getTopicById } from "../../../services/threads.service";
import Avatar from "../../../components/Avatar/Avatar";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { deleteThread } from "../../../functions/threads-functions";

export default function EditThread() {
  const { user, userData } = useContext(AppContext);
  const { id } = useParams();
  
  const navigate = useNavigate();
  
  const [thread, setThread] = useState(null);
  const [attachedImg, setAttachedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");

  useEffect(() => {
    getTopicById(id).then(res => {
      if (res) {
        setThread(res);
        setOldImageUrl(res.url);
        setThreadTitle(res.title);
        setThreadContent(res.content);
        console.log(res);
    } else {
        navigate("*");
    }
    });
  }, [id, navigate]);

  useEffect(() => {
    if (attachedImg && thread) {
      setLoading(true);
        uploadThreadImage(attachedImg, thread.uuid)
            .then((url) => setNewImageUrl(url))
            .then(() => toast.success("Image uploaded successfully!"))
            .catch((e) => toast(e.message))
            .finally(() => setLoading(false));
    }
  }, [attachedImg, thread]);

  const updateThread = (key, value) => {
    setThread({
      ...thread,
      [key]: value,
    });
    if (key === "title") setThreadTitle(value);
    if (key === "content") setThreadContent(value);
    console.log(thread[key]);
  };

  const removeAttachedImg = async () => {
    if (oldImageUrl) {
        try {
            await deleteThreadImage(thread.uuid);
            setThread({...thread, uuid: v4(), url: ""});
            setOldImageUrl(null);
        } catch (e) {
            console.log(e.message);
        }
    } else {
        try {
          await deleteThreadImage(thread.uuid);
          setNewImageUrl("");
          setAttachedImg(null);
        } catch (e) {
          console.log(e.message);
        }
    }
  };

  const getThreadTypeInput = () => {
    switch (thread.type) {
      case "post":
        return (
          <div className="create-thread-type-inputs">
            <input
              className="thread-type-title"
              type="text"
              placeholder="Title"
              value={threadTitle}
              onChange={(e) => updateThread("title", e.target.value)}
            />
            <textarea
              placeholder="What's it about?"
              value={threadContent}
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
              value={threadTitle}
              onChange={(e) => updateThread("title", e.target.value)}
            />
            {!oldImageUrl && <input
              type="file"
              onChange={(e) => setAttachedImg(e.target.files[0])}
            />}
            {loading && <p>Uploading...</p>}
            {(oldImageUrl || newImageUrl) && <img src={oldImageUrl || newImageUrl} alt="Attached" />}
            {(oldImageUrl || newImageUrl) && (
              <button onClick={removeAttachedImg}>Remove</button>
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
              value={threadTitle}
              onChange={(e) => updateThread("title", e.target.value)}
            />
            <input
              className="thread-type-url"
              type="text"
              placeholder="Url"
              value={threadContent}
              onChange={(e) => updateThread("content", e.target.value)}
            />
          </div>
        );
    }
  };

  const submitThread = async () => {

    if (!thread.title) 
        return toast.error("Title is a required field.");
    if (thread.type !== 'image' && !thread.content) 
        return toast.error('Content is a required field.');
    if (thread.title.length < MIN_TITLE_LENGTH)
      return toast.error("Title must be at least 16 characters long.");
    if (thread.title.length > MAX_TITLE_LENGTH)
      return toast.error("Title must be at most 64 characters long.");
    if (thread.type !== 'image' && thread.content.length < MIN_CONTENT_LENGTH)
      return toast.error("Content must be at least 32 characters long.");
    if (thread.type !== 'image' && thread.content.length > MAX_CONTENT_LENGTH)
      return toast.error("Content must be at most 8192 characters long.");
      if (thread.type === 'image' && !oldImageUrl && !newImageUrl)
      return toast.error("Please upload an image!");

    try {
      await deleteThread(thread.author, thread.id, thread.uuid, oldImageUrl || newImageUrl, "Changes submitted successfully!");
      await addThread(
        thread.title,
        thread.content,
        userData.handle,
        newImageUrl || oldImageUrl,
        thread.uuid,
        thread.type
      );
      navigate("/threads/newest");
    } catch (e) {
      toast.error("Could not update thread.");
    } finally {
      setAttachedImg(null);
    }
  };

  if (user) {
    return (
      <div className="create-thread-container">
        <h2>Edit Thread</h2>
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
              {thread && getThreadTypeInput()}
              <button
                onClick={() => {
                deleteThread(thread.author, thread.id, thread.uuid, thread.url, "Thread has been successfully deleted");
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
                }}
                >
                Delete thread
              </button>
              <button className="post-button" onClick={submitThread}>Submit changes</button>
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

EditThread.propTypes = {
  thread: PropTypes.object
};