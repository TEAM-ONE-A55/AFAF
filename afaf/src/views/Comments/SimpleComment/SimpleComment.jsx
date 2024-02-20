import PropTypes from "prop-types";
import "./SimpleComment.css";
import { useContext, useEffect, useState } from "react";
import { getUserByHandle } from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import Avatar from "../../../components/Avatar/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import OnEditComment from "../OnEditComment/OnEditComment";
import { deleteComment } from "../../../services/threads.service";
import toast from "react-hot-toast";
import { avoidPropagation } from "../../../functions/other-functions";

export default function SimpleComment({ comment, setThread, thread }) {
  const { userData } = useContext(AppContext);
  const [author, setAuthor] = useState({
    avatar: "",
  });
  const [onEditing, setOnEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(comment.author).then((snapshot) => {
      setAuthor({
        avatar: snapshot.val().avatar,
      });
    });
  }, [comment.author]);

  const handleEditing = (updatedComment) => {
    comment.comment = updatedComment;
    setEditedComment(updatedComment);
    setOnEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteComment(id, comment.id);
      toast.success("Poof! Your comment is gone.");
    } catch (e) {
      console.log(e.message);
    } finally {
      delete thread.comments[comment.id]
      setThread({...thread})
    }
  };

   if(userData) return (
    <div className="simple-comment-container">
      <div className="simple-comment-top">
        <span>
          <Avatar
            onClick={() => navigate(`/profile/${comment.author}`)}
            Width={"40px"}
            Height={"40px"}
            url={author.avatar}
          />
        </span>
        <p className="single-thread-left-side-handle">
          <a onClick={e => avoidPropagation(e, () => {navigate(`/profile/${comment.author}`)})}>@{comment.author}</a>
        </p>
        <span className="simple-comment-date">{new Date(comment.createdOn).toLocaleString()}</span>
      </div>
      <div className="simple-comment-bottom">
        {onEditing ? (
          <>
            <OnEditComment className="apply-transition-50ms" comment={comment} onUpdate={handleEditing} />
          </>
        ) : (
          <p className="apply-transition-50ms">{editedComment}</p>
        )}
        <div className="simple-comment-buttons-wrapper">
          {userData.handle === comment.author && (
            <button onClick={() => setOnEditing(!onEditing)}>
              {onEditing ? "Back" : "Edit"}
            </button>
          )}
          {(userData.handle === comment.author || userData.role === "admin") && (
            <button className="delete-comment-button" onClick={handleDelete}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}

SimpleComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setThread: PropTypes.func,
  thread: PropTypes.object
};
