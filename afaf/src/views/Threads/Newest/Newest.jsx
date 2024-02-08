import PropTypes from "prop-types";

export default function Newest({ navigation }) {
  return (
    <div>
      {navigation}
      <h1>Newest</h1>
    </div>
  );
}

Newest.propTypes = {
  navigation: PropTypes.node.isRequired,
};
