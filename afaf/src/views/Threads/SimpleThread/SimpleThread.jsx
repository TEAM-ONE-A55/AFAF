import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export default function SimpleThread({ topic, topicLike, topicDislike }) {
  const { user, userData } = useContext(AppContext);

  return (
    <div style={{ border: "solid" }}>
      <h3>{topic.title}</h3>
      <p>{topic.content}</p>
      <p>{topic.createdOn}</p>
      <p>
        {topic.likedBy.length} likes
        {user && (
          <>
            <Button onClick={() => topicLike(userData.handle, topic.id)}>
              Like
            </Button>
            <Button onClick={() => topicDislike(userData.handle, topic.id)}>
              Dislike
            </Button>
          </>
        )}
      </p>
      <p>{topic.commentedBy.length} comments</p>
    </div>
  );
}

SimpleThread.propTypes = {
  topic: PropTypes.object.isRequired,
  topicLike: PropTypes.func.isRequired,
  topicDislike: PropTypes.func.isRequired,
};
