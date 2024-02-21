import "./EditThread.css";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { updateThreadDB } from "../../../services/threads.service";
import { uploadThreadImage, deleteThreadImage } from "../../../services/storage.service";
import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from "../../../constants/constants";
import { getTopicById } from "../../../services/threads.service";
import Avatar from "../../../components/Avatar/Avatar";
import toast from "react-hot-toast";
import { deleteThread } from "../../../functions/threads-functions";

export default function EditThread() {
  const { user, userData } = useContext(AppContext);
  const { id } = useParams();
  
  const navigate = useNavigate();
  
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attachedImg, setAttachedImg] = useState(null);
  const [oldImageUrl, setOldImageUrl] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [threadTitle, setThreadTitle] = useState(null);
  const [threadContent, setThreadContent] = useState(null);

  useEffect(() => {
    getTopicById(id).then(res => {
      if (res) {
        setThread(res);
        setOldImageUrl(res.url);
        setThreadTitle(res.title);
        setThreadContent(res.content);
    } else {
        navigate("*");
    }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (attachedImg && thread) {
      setLoading(true);
        uploadThreadImage(attachedImg, thread.uuid)
            .then((url) => setNewImageUrl(url))
            .then(() => toast.success("Image uploaded successfully!"))
            .catch((e) => toast(e.message))
            .finally(() => setLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachedImg]);

  const updateThread = (key, value) => {
    setThread({
      ...thread,
      [key]: value,
    });
    if (key === "title") setThreadTitle(value);
    if (key === "content") setThreadContent(value);
    // console.log(thread[key]);
  };

  const removeAttachedImg = async () => {
    if (oldImageUrl) {
        try {
            await deleteThreadImage(thread.uuid);
            setOldImageUrl(null);
        } catch (e) {
            console.log(e.message);
        }
    } else {
        try {
          await deleteThreadImage(thread.uuid);
          setNewImageUrl(null);
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
            <input
              id="upload-photo-input"
              type="file"
              onChange={(e) => setAttachedImg(e.target.files[0])}
            />
            {!attachedImg && !oldImageUrl && <label className="upload-photo-input-button" htmlFor="upload-photo-input">Upload an image</label>}
            {loading && <p>Uploading...</p>}
            <div className="attached-thread-image-container">
              {(oldImageUrl || newImageUrl) && <img className="attached-thread-image" src={oldImageUrl || newImageUrl} alt="Attached" />}
              {(oldImageUrl || newImageUrl) && (
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
      updateThreadDB(thread.id, {
        ...thread,
        url: newImageUrl || oldImageUrl,
        title: threadTitle,
        content: threadContent
      });
      navigate("/threads/newest");
      toast.success("Thread has been successfully updated");
    }
     catch (e) {
      toast.error("Could not update thread.");
    } finally {
      setAttachedImg(null);
    }
  };

  if (user) {
    return (
      <div className="create-thread-container">
        <hr />
        <h2>Edit Thread</h2>
        <div className="create-thread-container-content">
          <div className="create-thread-left-side">
            <div className="create-thread-user">
              <Avatar
                Width="40px"
                Height="40px"
                url={userData.avatar}
                onClick={() => navigate(`/profile/${userData.handle}`)}
              />
              <h3>{userData.handle}</h3>
            </div>
            <div className="create-thread-type">
              {thread && getThreadTypeInput()}
              <div className="edit-thread-buttons">
                <button
                  className="delete-thread-button"
                  onClick={() => {
                  deleteThread(thread.author, thread.id, thread.uuid, thread.url, "Thread has been successfully deleted");
                  setTimeout(() => {
                      navigate(-1);
                  }, 1000);
                  }}
                  >
                  Delete thread
                </button>
                <button className="" onClick={submitThread}>Submit changes</button>
              </div>
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