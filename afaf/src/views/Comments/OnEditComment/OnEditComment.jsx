import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateComment } from "../../../services/threads.service";
import { useParams } from "react-router-dom";

export default function OnEditComment({ comment, onUpdate }) {
  const [editedComment, setEditedComment] = useState(comment.comment);

  const { id } = useParams();
  const [post, setPost] = useState(false);

  useEffect(() => {
    if (post) {
      updateComment(id, comment.id, editedComment).then(() => {
        onUpdate(editedComment);
        setPost(false);
      });
    }
  }, [comment.id, editedComment, id, onUpdate, post]);

  const onUpdateComment = (e) => {
    setEditedComment(e.target.value);
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpdateComment(e);
      setPost(true)
    }
  };
  return (
    <div>
      {!post && (
        <div className="textarea-container">
          <textarea
            className="textarea-comment-onAction"
            onChange={onUpdateComment}
            value={editedComment}
            onKeyDown={handleOnKeyDown}
          />
          <span
            onClick={() => setPost(true)}
            className="material-symbols-outlined comment-btn"
          >
            send
          </span>
        </div>
      )}
    </div>
  );
}

OnEditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
