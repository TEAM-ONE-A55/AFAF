import PropTypes from "prop-types";
import "./SimpleComment.css";
import { useContext, useEffect, useState } from "react";
import { getUserByHandle } from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import Avatar from "../../../components/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import OnEditComment from "../OnEditComment/OnEditComment";

export default function SimpleComment({ comment }) {
  const { userData } = useContext(AppContext);
  const [author, setAuthor] = useState({
    avatar: "",
  });
  const [editing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment)

  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(comment.author).then((snapshot) => {
      setAuthor({
        avatar: snapshot.val().avatar,
      });
    });
  }, [comment.author, author]);

  const handleEditing = (updatedComment) => {
    setEditedComment(updatedComment);
    setEditing(false)
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
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
      {editing ? (
        <>
          <OnEditComment comment={comment} onUpdate={handleEditing} />
        </>
      ) : (
        <p>{editedComment}</p>
      )}

      {userData.handle === comment.author && (
        <Button onClick={() => setEditing(!editing)}>
          {editing ? "Back" : "Edit"}
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
