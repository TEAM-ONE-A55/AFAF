import PropTypes from "prop-types";

export default function Popular({ navigation }) {
  return (
    <div>
      {navigation}
      <h1>Popular</h1>
    </div>
  );
}

Popular.propTypes = {
  navigation: PropTypes.node.isRequired,
};
