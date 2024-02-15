import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ onClick, children }) {
  return <button style={{ fontFamily: "Lexend"}} onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
