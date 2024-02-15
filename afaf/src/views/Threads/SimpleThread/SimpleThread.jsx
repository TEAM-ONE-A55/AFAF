import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, NavLink } from "react-router-dom";
import "./SimpleThread.css";
import Avatar from "../../../components/Avatar/Avatar";
import { getUserByHandle } from "../../../services/users.service";
import toast from "react-hot-toast";

export default function SimpleThread({ topic, topicLike, topicDislike }) {
  const { user, userData } = useContext(AppContext);
  const [author, setAuthor] = useState({
    avatar: "",
    username: "",
    createdOn: "",
    threads: null,
  });

  useEffect(() => {
    getUserByHandle(topic.author).then((snapshot) => {
      setAuthor({
        avatar: snapshot.val().avatar,
        username: snapshot.val().handle,
        createdOn: new Date(snapshot.val().createdOn).toLocaleDateString(),
        threads: "TODO!!!",
      });
    });
  }, [author, topic.author]);

  const seeAuthorProfile = async () => {
    toast("TODO! To implement 'See Author's Profile' functionality", {
      icon: "⚠️",
    });
  };

  return (
    <div className="simple-thread-container">
      <span className="author-info">
        <Avatar
          onClick={seeAuthorProfile}
          Width={"70px"}
          Height={"70px"}
          url={author.avatar}
        />
        <p>
          Author: <Link onClick={seeAuthorProfile}>@{author.username}</Link>
        </p>
        <p>Member since: {author.createdOn}</p>
        <p>
          Total threads:{" "}
          <Link
            onClick={() => {
              toast(
                "TODO! To implement 'treads created' as a key in users/ after creating thread functionality",
                {
                  icon: "⚠️",
                }
              );
            }}
          >
            {author.threads}
          </Link>
        </p>
      </span>
      <hr />
      <h3>{topic.title}</h3>
      <p>{topic.content}</p>
      <p>
        Created on: {topic.createdOn}
        {/* {new Date(topic.createdOn).toLocaleDateString()} at{" "} */}
        {/* {new Date(topic.createdOn)} */}
      </p>
      {topic.likedBy.length === 1 ? (
        <p>{topic.likedBy.length} like</p>
      ) : (
        <p>{topic.likedBy.length} likes</p>
      )}
      <p>
        {user && (
          <>
            <Button onClick={() => topicLike(userData.handle, topic.id)}>
              Like
            </Button>
            <Button onClick={() => topicDislike(userData.handle, topic.id)}>
              Dislike
            </Button>
            <NavLink to={`/single-thread/${topic.id}`}>View</NavLink>
          </>
        )}
      </p>
      {topic.commentedBy.length === 1 ? (
        <p>{topic.commentedBy.length} comment</p>
      ) : (
        <p>{topic.commentedBy.length} comments</p>
      )}
    </div>
  );
}

SimpleThread.propTypes = {
  topic: PropTypes.object.isRequired,
  topicLike: PropTypes.func.isRequired,
  topicDislike: PropTypes.func.isRequired,
};
