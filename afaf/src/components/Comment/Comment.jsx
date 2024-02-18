import { useContext, useEffect, useState } from "react";
import "./Comment.css";
import { AppContext } from "../../context/AppContext";
import PropTypes from "prop-types";
import { updateTopic } from "../../services/threads.service";
import { v4 } from "uuid";

export default function Comment({ thread }) {
  const { userData } = useContext(AppContext);
  const [textArea, setTextArea] = useState(false);
  const [comment, setComment] = useState("");
  const [id, setId] = useState(v4());
  const [commentsData, setCommentsData] = useState(thread.comments || {});

  const handleTextAreaOnClick = () => {
    setTextArea(true);
  };

  useEffect(() => {
    updateTopic(thread.id, "comments", commentsData);
    setComment("");
    setTextArea(false);
  }, [commentsData]);

  const addComment = () => {
    setCommentsData({
      ...commentsData,
      [id]: {
        author: userData.handle,
        comment: comment,
        createdOn: Date.now(),
      },
    });
    setId(v4());
  };
  return !textArea ? (
    <div className="textarea-container">
      <textarea
        className="textarea-comment"
        placeholder="Add a comment"
        onClick={handleTextAreaOnClick}
        onChange={() => {}}
        value=""
      />
    </div>
  ) : (
    <div className="textarea-container">
      <textarea
        className="textarea-comment-onAction"
        placeholder="What's on your mind? Feel free to express yourself..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <span
        onClick={addComment}
        className="material-symbols-outlined comment-btn"
      >
        send
      </span>
    </div>
  );
}

Comment.propTypes = {
  thread: PropTypes.object.isRequired,
};
