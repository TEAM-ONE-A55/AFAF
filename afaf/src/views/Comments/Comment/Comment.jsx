import { useContext, useEffect, useState } from "react";
import "./Comment.css";
import { AppContext } from "../../../context/AppContext";
import PropTypes from "prop-types";
import { updateTopic } from "../../../services/threads.service";
import { v4 } from "uuid";
import { avoidPropagation } from "../../../functions/other-functions";
import { toast } from "react-hot-toast";

export default function Comment({ thread, setThread }) {
  const { userData } = useContext(AppContext);
  const [textArea, setTextArea] = useState(false);
  const [comment, setComment] = useState("");
  const [id, setId] = useState(v4());
  const [commentsData, setCommentsData] = useState(thread.comments || {});

  useEffect(() => {
    updateTopic(thread.id, "comments", commentsData);
    thread.comments = commentsData;
    setThread({ ...thread });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsData, thread.id]);

  const addComment = () => {
    if (!comment) return toast.error("Comment can't be empty!");
    setCommentsData({
      ...commentsData,
      [id]: {
        author: userData.handle,
        comment: comment,
        createdOn: Date.now(),
        id: id,
      },
    });
    setComment("");
    setTextArea(false);
    setId(v4());
    return toast.success("Comment added!");
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") addComment();
  };
  return !textArea ? (
    <div className='textarea-container'>
      <textarea
        className='textarea-comment'
        placeholder='Add a comment'
        onFocus={() => setTextArea(true)}
        onChange={() => {}}
        value=''
      />
    </div>
  ) : (
    <div className='textarea-container'>
      <textarea
        className='textarea-comment-onAction'
        placeholder='Add a comment'
        onBlur={() => setTimeout(() => setTextArea(false), 80)}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        onKeyDown={handleOnKeyDown}
      />
      <span
        onClick={(e) => avoidPropagation(e, addComment)}
        className='material-symbols-outlined comment-btn'
      >
        send
      </span>
    </div>
  );
}

Comment.propTypes = {
  thread: PropTypes.object.isRequired,
  setThread: PropTypes.func,
};
