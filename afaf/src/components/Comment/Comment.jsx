import { useState } from "react";
import "./Comment.css";

export default function Comment() {
  const [textArea, setTextArea] = useState(false);

  const handleTextAreaOnClick = () => {
    setTextArea(true);
  };
  return !textArea ? (
    <textarea
      className="textarea-comment"
      placeholder="Add a comment"
      onClick={handleTextAreaOnClick}
    />
  ) : (
    <div className="textarea-container">
      <textarea
        className="textarea-comment-onAction"
        placeholder="Add a comment"
      />
      <span className="material-symbols-outlined comment-btn">send</span>
    </div>
  );
}
