import PropTypes from "prop-types";
import { v4 } from "uuid";
import SimpleComment from "../SimpleComment/SimpleComment";
import "./RenderComments.css";

export default function Comments({ thread, setThread }) {

  return (
    <div className="comments-container">
      {thread.comments &&
        Object.values(thread.comments)
          .sort((a, b) => b.createdOn - a.createdOn)
          .map((comment) => {
            return (
              <div className="simple-comment" key={v4()}>
                <SimpleComment comment={comment} setThread={setThread} thread={thread}/>
              </div>
            );
          })}
    </div>
  );
}

Comments.propTypes = {
  thread: PropTypes.object.isRequired,
  setThread: PropTypes.func
};
