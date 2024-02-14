import "./Avatar.css";
import PropTypes from "prop-types";
export default function Avatar({ Width, Height, url, onClick }) {
  return (
    <img
      className="avatar-img"
      onClick={() => onClick()}
      style={{ width: Width, height: Height }}
      src={url}
      alt="avatar-default"
    />
  );
}

Avatar.propTypes = {
  Width: PropTypes.string,
  Height: PropTypes.string,
  url: PropTypes.any,
  onClick: PropTypes.func,
};
