import PropTypes from "prop-types"

export default function AllThreads ({navigation}) {
    return (
        <div>
            {navigation}
            <h1>All Threads</h1>
        </div>
    )
}

AllThreads.propTypes = {
    navigation: PropTypes.node.isRequired
}