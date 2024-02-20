import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateComment } from "../../../services/threads.service";
import { useParams } from "react-router-dom";

export default function OnEditComment({ comment, onUpdate }) {
  const [editedComment, setEditedComment] = useState(comment.comment);

  const { id } = useParams();
  const [onPublish, setOnPublish] = useState(false);

  useEffect(() => {
    if (onPublish) {
      updateComment(id, comment.id, editedComment).then(() => {
        onUpdate(editedComment);
        setOnPublish(false);
      });
    }
  }, [comment.id, editedComment, id, onPublish]);

  const onUpdateComment = (e) => {
    setEditedComment(e.target.value);
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpdateComment(e);
      setOnPublish(true)
    }
  };
  return (
    <div>
      {!onPublish && (
        <div className="textarea-container">
          <textarea
            className="textarea-comment-onAction"
            onChange={onUpdateComment}
            value={editedComment}
            onKeyDown={handleOnKeyDown}
          />
          <span
            onClick={() => setOnPublish(true)}
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
