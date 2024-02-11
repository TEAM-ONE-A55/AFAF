import PropTypes from "prop-types"
import {getAllTopics} from "./../../../services/topics.service"

const getTopics = async () => {
    const topics = await getAllTopics("")
    return topics;
}
const topics = await getTopics();
console.log(topics);

export default function AllThreads ({navigation}) {
    return (
        <div>
            {navigation}
            <h1>All Threads</h1>
            <div>
                {topics.map((topic) => {
                    return (
                        <div key={topic.id}>
                            <h3>{topic.title}</h3>
                            <p>{topic.content}</p>
                            <p>{topic.createdOn}</p>
                            <p>{topic.likedBy.length} likes</p>
                            <p>{topic.commentedBy.length} comments</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

AllThreads.propTypes = {
    navigation: PropTypes.node.isRequired
}