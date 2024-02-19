import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import Comment from "../../../components/Comment/Comment";
import { updateComment } from "../../../services/threads.service";
import { useParams } from "react-router-dom";

export default function OnEditComment({ comment }) {
  const [currComment, setCurrComment] = useState(comment.comment);
  // const [newComment, setNewComment] = useState("");
  // const [textArea, setTextArea] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState(false);

  useEffect(() => {
    updateComment(id, comment.id, currComment);
    comment.comment = currComment;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const onUpdateComment = (e) => {
    setCurrComment(e.target.value);
    setPost(true);
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") updateComment();
  };
  return (
    <div>
      <div className="textarea-container">
        <textarea
          className="textarea-comment-onAction"
          onChange={onUpdateComment}
          value={currComment}
          onKeyDown={handleOnKeyDown}
        />
        <span
          onClick={() => setPost(true)}
          className="material-symbols-outlined comment-btn"
        >
          send
        </span>
      </div>
    </div>
  );
}

OnEditComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
