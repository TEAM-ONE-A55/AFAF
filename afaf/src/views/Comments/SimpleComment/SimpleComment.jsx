import PropTypes from "prop-types";
import "./SimpleComment.css";
import { useContext, useEffect, useState } from "react";
import { getUserByHandle } from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import Avatar from "../../../components/Avatar/Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import OnEditComment from "../OnEditComment/OnEditComment";
import { deleteComment } from "../../../services/threads.service";
import toast from "react-hot-toast";

export default function SimpleComment({ comment }) {
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
    }
  };

   if(userData) return (
    <div className="simple-comment-container">
      <span>
        <Avatar
          onClick={() => navigate(`/profile/${comment.author}`)}
          Width={"40px"}
          Height={"40px"}
          url={author.avatar}
        />
      </span>
      <span>
        <Link to={`/profile/${comment.author}`}>{comment.author}</Link>
      </span>
      <span>{new Date(comment.createdOn).toLocaleString()}</span>
      <hr />
      {onEditing ? (
        <>
          <OnEditComment comment={comment} onUpdate={handleEditing} />
        </>
      ) : (
        <p>{editedComment}</p>
      )}

      {userData.handle === comment.author && (
        <Button onClick={() => setOnEditing(!onEditing)}>
          {onEditing ? "Back" : "Edit"}
        </Button>
      )}
      {(userData.handle === comment.author || userData.role === "admin") && (
        <Button onClick={handleDelete}>Delete</Button>
      )}
    </div>
  );
}

SimpleComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
